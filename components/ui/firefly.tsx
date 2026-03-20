"use client";

import { useEffect, useRef } from "react";

type Vector2D = {
	x: number;
	y: number;
};

type FireflyPath = {
	start: Vector2D;
	end: Vector2D;
	speed: number;
};

type FireflyEffectProps = {
	circleCount?: number;
	speedFactor?: number;
	minRadius?: number;
	maxRadius?: number;
	focusRadius?: number;
	glowIntensity?: number;
	maxOpacity?: number;
	minOpacity?: number;
	intensityPower?: number;
	backgroundColor?: string;
	color1?: string;
	color2?: string;
	color3?: string;
	color4?: string;
	followCursor?: boolean;
	path?: FireflyPath;
};

type FireflyCircleConfig = {
	colors: string[];
	focusRadius: number;
	glowIntensity: number;
	intensityPower: number;
	maxOpacity: number;
	maxRadius: number;
	minOpacity: number;
	speedFactor: number;
};

class FireflyCircle {
	x: number;
	y: number;
	baseRadius: number;
	baseDx: number;
	baseDy: number;
	ctx: CanvasRenderingContext2D;
	color: string;
	noiseOffsetX: number;
	noiseOffsetY: number;
	randomFactor: number;
	config: FireflyCircleConfig;

	constructor(
		x: number,
		y: number,
		radius: number,
		context: CanvasRenderingContext2D,
		config: FireflyCircleConfig,
	) {
		this.x = x;
		this.y = y;
		this.baseRadius = radius;
		this.baseDx = (Math.random() - 0.5) * 1.5;
		this.baseDy = (Math.random() - 0.5) * 1.5;
		this.ctx = context;
		this.config = config;

		this.color =
			config.colors[Math.floor(Math.random() * config.colors.length)];

		this.noiseOffsetX = x * 0.01;
		this.noiseOffsetY = y * 0.01;

		this.randomFactor = 0.7 + Math.sin(x * 0.05) * 0.3;
	}

	draw(focusX: number | null, focusY: number | null): void {
		if (focusX === null || focusY === null) return;

		const dx = focusX - this.x;
		const dy = focusY - this.y;
		const distanceSquared = dx * dx + dy * dy;
		const focusRadiusSquared =
			this.config.focusRadius * this.config.focusRadius;

		if (distanceSquared > focusRadiusSquared * 1.5) return;

		const distance = Math.sqrt(distanceSquared);
		const noiseOffset =
			Math.sin(this.noiseOffsetX + this.noiseOffsetY) * 30 +
			Math.cos(this.noiseOffsetX * 2 - this.noiseOffsetY * 1.5) * 25;
		const adjustedDistance = distance + noiseOffset;

		if (adjustedDistance < this.config.focusRadius) {
			const proximity = 1 - adjustedDistance / this.config.focusRadius;
			const intensity =
				proximity ** this.config.intensityPower * this.randomFactor;
			const renderRadius = this.baseRadius + this.config.maxRadius * intensity;
			const opacity = Math.max(
				this.config.minOpacity,
				intensity * this.config.maxOpacity,
			);

			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.shadowBlur =
				this.config.glowIntensity * intensity + Math.random() * 10;
			this.ctx.shadowColor = this.color;
			this.ctx.globalAlpha = opacity;
			this.ctx.fillStyle = this.color;
			this.ctx.arc(this.x, this.y, renderRadius, 0, Math.PI * 2);
			this.ctx.fill();
			this.ctx.restore();
		}
	}

	update(
		width: number,
		height: number,
		focusX: number | null,
		focusY: number | null,
	): void {
		this.x += this.baseDx * this.config.speedFactor;
		this.y += this.baseDy * this.config.speedFactor;

		if (this.x + this.baseRadius > width || this.x - this.baseRadius < 0) {
			this.baseDx = -this.baseDx;
		}

		if (this.y + this.baseRadius > height || this.y - this.baseRadius < 0) {
			this.baseDy = -this.baseDy;
		}

		this.draw(focusX, focusY);
	}
}

const FireflyEffect = ({
	circleCount = 1500,
	speedFactor = 0.8,
	minRadius = 1,
	maxRadius = 10,
	focusRadius = 150,
	glowIntensity = 15,
	maxOpacity = 0.9,
	minOpacity = 0.05,
	intensityPower = 2.5,
	backgroundColor = "#000000",
	color1 = "#fbf8cc",
	color2 = "#fdd835",
	color3 = "#fff176",
	color4 = "#ffeb3b",
	followCursor = true,
	path,
}: FireflyEffectProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const focusPointRef = useRef<{ x: number | null; y: number | null }>({
		x: null,
		y: null,
	});
	const isCursorTrackingEnabled = followCursor && !path;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;
		const colors = [color1, color2, color3, color4];
		const circleConfig: FireflyCircleConfig = {
			colors,
			focusRadius,
			glowIntensity,
			intensityPower,
			maxOpacity,
			maxRadius,
			minOpacity,
			speedFactor,
		};

		let pathProgress = 0;
		let lastTimestamp = 0;

		const resolveVector = (
			vector: Vector2D,
			width: number,
			height: number,
		): Vector2D => ({
			x: vector.x * width,
			y: vector.y * height,
		});

		const updateFocusPointFromPath = (
			width: number,
			height: number,
			deltaTime: number,
		): void => {
			if (!path) return;

			const start = resolveVector(path.start, width, height);
			const end = resolveVector(path.end, width, height);
			const deltaX = end.x - start.x;
			const deltaY = end.y - start.y;
			const distance = Math.hypot(deltaX, deltaY);

			if (distance === 0) {
				focusPointRef.current = start;
				return;
			}

			pathProgress =
				(pathProgress + (path.speed * deltaTime) / 1000 / distance) % 1;

			focusPointRef.current = {
				x: start.x + deltaX * pathProgress,
				y: start.y + deltaY * pathProgress,
			};
		};

		let animationFrameId: number;
		let circles: FireflyCircle[] = [];

		const resizeCanvas = (): void => {
			const dpi = window.devicePixelRatio || 1;
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;

			canvas.width = width * dpi;
			canvas.height = height * dpi;

			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
		};

		const init = (): void => {
			circles = [];
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;

			for (let i = 0; i < circleCount; i++) {
				const radius = Math.random() * 2 + minRadius;
				const x = Math.random() * (width - radius * 2) + radius;
				const y = Math.random() * (height - radius * 2) + radius;
				circles.push(new FireflyCircle(x, y, radius, ctx, circleConfig));
			}
		};

		const animate = (timestamp: number): void => {
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;
			const deltaTime = lastTimestamp === 0 ? 0 : timestamp - lastTimestamp;
			lastTimestamp = timestamp;

			if (path) {
				updateFocusPointFromPath(width, height, deltaTime);
			}

			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, width, height);

			const { x: nextFocusX, y: nextFocusY } = focusPointRef.current;
			const visibilityMargin = focusRadius * 1.5;
			const isPathFocusOffscreen =
				path !== undefined &&
				nextFocusX !== null &&
				nextFocusY !== null &&
				(nextFocusX < -visibilityMargin ||
					nextFocusX > width + visibilityMargin ||
					nextFocusY < -visibilityMargin ||
					nextFocusY > height + visibilityMargin);
			const focusX = isPathFocusOffscreen ? null : nextFocusX;
			const focusY = isPathFocusOffscreen ? null : nextFocusY;

			for (let i = 0; i < circles.length; i++) {
				circles[i].update(width, height, focusX, focusY);
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		const handleMouseMove = (event: MouseEvent): void => {
			const rect = canvas.getBoundingClientRect();
			focusPointRef.current.x = event.clientX - rect.left;
			focusPointRef.current.y = event.clientY - rect.top;
		};

		const handleMouseLeave = (): void => {
			focusPointRef.current.x = null;
			focusPointRef.current.y = null;
		};

		const handleResize = (): void => {
			resizeCanvas();
			init();
		};

		window.addEventListener("resize", handleResize);

		if (isCursorTrackingEnabled) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseout", handleMouseLeave);
		}

		resizeCanvas();
		init();

		if (path) {
			updateFocusPointFromPath(canvas.offsetWidth, canvas.offsetHeight, 0);
		}

		animate(0);

		return () => {
			window.removeEventListener("resize", handleResize);

			if (isCursorTrackingEnabled) {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseout", handleMouseLeave);
			}

			cancelAnimationFrame(animationFrameId);
		};
	}, [
		circleCount,
		speedFactor,
		minRadius,
		maxRadius,
		focusRadius,
		glowIntensity,
		maxOpacity,
		minOpacity,
		intensityPower,
		color1,
		color2,
		color3,
		color4,
		backgroundColor,
		followCursor,
		path,
		isCursorTrackingEnabled,
	]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: -10,
				backgroundColor: backgroundColor,
			}}
		/>
	);
};

export default FireflyEffect;
