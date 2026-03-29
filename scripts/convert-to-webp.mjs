#!/usr/bin/env node

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DEFAULT_QUALITY = 82;
const DEFAULT_EFFORT = 6;
const DEFAULT_SVG_DENSITY = 144;
const HIGH_QUALITY_PRESET = 95;
const SUPPORTED_EXTENSIONS = new Set([".png", ".svg"]);

function printUsage() {
  console.log(`Usage:
  node scripts/convert-to-webp.mjs <input> [options]

Original resolution is preserved unless --scale, --max-width, or --max-height is provided.

Options:
  -o, --output <path>       Output file path. Defaults to <input>.webp
  -q, --quality <number>    WebP quality from 1-100. Default: ${DEFAULT_QUALITY}
  --high-quality            Use a higher-quality preset for sharper output
  -e, --effort <number>     Compression effort from 0-6. Default: ${DEFAULT_EFFORT}
  --scale <number>          Multiply the output dimensions for a denser asset
  --trim                    Remove transparent edge padding before conversion
  --width <number>          Resize to this width, preserving aspect ratio
  --height <number>         Resize to this height, preserving aspect ratio
  --max-width <number>      Resize to fit within this width
  --max-height <number>     Resize to fit within this height
  --sharpen <number>        Apply a sharpening pass after resizing
  --density <number>        SVG render density. Default: ${DEFAULT_SVG_DENSITY}
  --lossless                Encode as lossless WebP
  -h, --help                Show this message

Examples:
  node scripts/convert-to-webp.mjs public/logo.png
  node scripts/convert-to-webp.mjs public/crown-mustang.png --high-quality
  node scripts/convert-to-webp.mjs public/makro.png --trim --lossless
  node scripts/convert-to-webp.mjs public/crown-mustang.png --scale 3 --lossless
  node scripts/convert-to-webp.mjs public/crown-mustang.png --height 40 --lossless --sharpen 1.2
  node scripts/convert-to-webp.mjs public/logo.svg --max-width 1600
  node scripts/convert-to-webp.mjs public/logo.png -o public/logo@2x.webp -q 76
`);
}

function exitWithError(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function parseNumberOption(rawValue, optionName, { min, max } = {}) {
  const value = Number.parseInt(rawValue, 10);

  if (Number.isNaN(value)) {
    exitWithError(`${optionName} must be a number.`);
  }

  if (min !== undefined && value < min) {
    exitWithError(`${optionName} must be at least ${min}.`);
  }

  if (max !== undefined && value > max) {
    exitWithError(`${optionName} must be at most ${max}.`);
  }

  return value;
}

function parseFloatOption(rawValue, optionName, { min, max } = {}) {
  const value = Number.parseFloat(rawValue);

  if (Number.isNaN(value)) {
    exitWithError(`${optionName} must be a number.`);
  }

  if (min !== undefined && value < min) {
    exitWithError(`${optionName} must be at least ${min}.`);
  }

  if (max !== undefined && value > max) {
    exitWithError(`${optionName} must be at most ${max}.`);
  }

  return value;
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = -1;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

function getDefaultOutputPath(inputPath) {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}.webp`);
}

function parseArguments(argv) {
  const args = [...argv];
  let inputPath;
  let outputPath;
  let quality = DEFAULT_QUALITY;
  let qualityWasSet = false;
  let effort = DEFAULT_EFFORT;
  let scale = 1;
  let trim = false;
  let width;
  let height;
  let maxWidth;
  let maxHeight;
  let sharpen;
  let density = DEFAULT_SVG_DENSITY;
  let highQuality = false;
  let lossless = false;

  while (args.length > 0) {
    const current = args.shift();

    if (!current) {
      continue;
    }

    if (current === "-h" || current === "--help") {
      printUsage();
      process.exit(0);
    }

    if (current === "-o" || current === "--output") {
      outputPath = args.shift();
      if (!outputPath) {
        exitWithError(`${current} requires a value.`);
      }
      continue;
    }

    if (current === "-q" || current === "--quality") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      quality = parseNumberOption(value, "quality", { min: 1, max: 100 });
      qualityWasSet = true;
      continue;
    }

    if (current === "--high-quality") {
      highQuality = true;
      continue;
    }

    if (current === "-e" || current === "--effort") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      effort = parseNumberOption(value, "effort", { min: 0, max: 6 });
      continue;
    }

    if (current === "--scale") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      scale = parseNumberOption(value, "scale", { min: 1 });
      continue;
    }

    if (current === "--trim") {
      trim = true;
      continue;
    }

    if (current === "--width") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      width = parseNumberOption(value, "width", { min: 1 });
      continue;
    }

    if (current === "--height") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      height = parseNumberOption(value, "height", { min: 1 });
      continue;
    }

    if (current === "--max-width") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      maxWidth = parseNumberOption(value, "max-width", { min: 1 });
      continue;
    }

    if (current === "--max-height") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      maxHeight = parseNumberOption(value, "max-height", { min: 1 });
      continue;
    }

    if (current === "--density") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      density = parseNumberOption(value, "density", { min: 1 });
      continue;
    }

    if (current === "--sharpen") {
      const value = args.shift();
      if (!value) {
        exitWithError(`${current} requires a value.`);
      }
      sharpen = parseFloatOption(value, "sharpen", { min: 0.01, max: 10 });
      continue;
    }

    if (current === "--lossless") {
      lossless = true;
      continue;
    }

    if (current.startsWith("-")) {
      exitWithError(`Unknown option: ${current}`);
    }

    if (inputPath) {
      exitWithError(`Unexpected extra argument: ${current}`);
    }

    inputPath = current;
  }

  if (!inputPath) {
    printUsage();
    process.exit(1);
  }

  if (highQuality && !qualityWasSet) {
    quality = HIGH_QUALITY_PRESET;
  }

  return {
    inputPath: path.resolve(inputPath),
    outputPath: path.resolve(outputPath ?? getDefaultOutputPath(inputPath)),
    quality,
    effort,
    scale,
    trim,
    width,
    height,
    maxWidth,
    maxHeight,
    sharpen,
    density,
    highQuality,
    lossless,
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const extension = path.extname(options.inputPath).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    exitWithError(
      `Unsupported file type "${extension || "unknown"}". Use a PNG or SVG input.`,
    );
  }

  let inputStats;

  try {
    inputStats = await stat(options.inputPath);
  } catch {
    exitWithError(`Input file not found: ${options.inputPath}`);
  }

  const sharpOptions = extension === ".svg" ? { density: options.density } : {};

  let image = sharp(options.inputPath, sharpOptions).rotate();

  if (options.trim) {
    image = image.trim();
  }

  const metadata = await image.metadata();

  let targetWidth = options.width;
  let targetHeight = options.height;

  if (!targetWidth && !targetHeight) {
    targetWidth = options.maxWidth;
    targetHeight = options.maxHeight;

    if (!targetWidth && metadata.width && options.scale > 1) {
      targetWidth = metadata.width * options.scale;
    }

    if (!targetHeight && metadata.height && options.scale > 1) {
      targetHeight = metadata.height * options.scale;
    }
  }

  if (targetWidth || targetHeight) {
    const usesExactResize = Boolean(options.width || options.height);
    const shouldPreventEnlargement =
      !usesExactResize &&
      options.scale === 1 &&
      (options.maxWidth || options.maxHeight);

    image = image.resize({
      width: targetWidth,
      height: targetHeight,
      fit: "inside",
      withoutEnlargement: shouldPreventEnlargement,
      kernel: sharp.kernel.lanczos3,
    });
  }

  if (options.sharpen) {
    image = image.sharpen(options.sharpen);
  }

  await mkdir(path.dirname(options.outputPath), { recursive: true });

  const result = await image
    .webp({
      quality: options.quality,
      alphaQuality: options.highQuality ? 100 : options.quality,
      effort: options.effort,
      lossless: options.lossless,
      nearLossless: options.highQuality && !options.lossless,
      smartSubsample: !options.lossless,
      exact: options.lossless || options.highQuality,
    })
    .toFile(options.outputPath);

  const outputStats = await stat(options.outputPath);
  const sizeChange = inputStats.size === 0
    ? 0
    : ((1 - outputStats.size / inputStats.size) * 100);

  console.log(`Created ${options.outputPath}`);
  console.log(`Size: ${formatBytes(inputStats.size)} -> ${formatBytes(outputStats.size)}`);
  console.log(`Dimensions: ${result.width}x${result.height}`);
  console.log(`Scale: ${options.scale}x`);
  if (options.trim) {
    console.log("Trim: enabled");
  }
  if (options.sharpen) {
    console.log(`Sharpen: ${options.sharpen}`);
  }
  console.log(
    `Mode: ${options.lossless ? "lossless" : options.highQuality ? "high-quality" : "default"}`,
  );

  if (sizeChange >= 0) {
    console.log(`Size reduction: ${sizeChange.toFixed(1)}%`);
  } else {
    console.log(`Size increase: ${Math.abs(sizeChange).toFixed(1)}%`);
  }

  if (extension === ".svg" && outputStats.size >= inputStats.size) {
    console.warn(
      "Warning: rasterized SVG output is larger than the source. Keeping the original SVG may be better for the web.",
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
