"use client";

import { getCalApi } from "@calcom/embed-react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import FireflyEffect from "@/components/ui/firefly";

const editorialFont = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
});

const titleWords = ["Where", "Attention", "Becomes", "Momentum"];

const navigationLinks = [
	{ href: "#about-me", label: "About me" },
	{ href: "#portfolio", label: "Portfolio" },
	{ href: "#experience", label: "Experience" },
];

export default function Page() {
	useEffect(() => {
		(async () => {
			const cal = await getCalApi({ namespace: "reunion" });
			cal("floatingButton", {
				calLink: "agustinapresta/reunion",
				config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
			});
			cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
		})();
	}, []);
	return (
		<main className="relative isolate min-h-screen overflow-hidden text-stone-950">
			<div className="pointer-events-none absolute inset-0">
				<FireflyEffect
					circleCount={1800}
					speedFactor={0.16}
					minRadius={0.8}
					maxRadius={4}
					focusRadius={500}
					glowIntensity={16}
					maxOpacity={0.5}
					minOpacity={0}
					backgroundColor="#f6efe5"
					color1="#8B5CF6"
					color2="#8B5CF6"
					color3="#6366F1"
					color4="#6366F1"
				/>
			</div>
			<div className="hero-square-pattern pointer-events-none absolute inset-0 z-0 opacity-50" />
			<div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.78),_transparent_36%),linear-gradient(180deg,_rgba(255,255,255,0.2)_0%,_rgba(246,239,229,0.56)_100%)]" />

			<section className="relative z-10 flex min-h-screen flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-16">
				<div className="flex justify-end">
					<Link
						href="#contact"
						className="hero-contact group relative overflow-hidden rounded-full border border-stone-900/15 bg-white/70 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-stone-950 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-md transition-colors duration-500 hover:text-stone-50"
					>
						<span className="absolute inset-0 translate-y-full rounded-full bg-stone-950 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
						<span className="absolute inset-0 rounded-full border border-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						<span className="relative z-10">Contact</span>
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="flex max-w-6xl flex-col items-center text-center">
						<div className="relative z-20 w-full overflow-hidden pb-3 text-left sm:pb-4">
							<p className="hero-name-reveal inline-block text-xs font-semibold uppercase tracking-[0.48em] text-stone-700 sm:text-sm">
								Agustina Presta
							</p>
						</div>

						<h1
							className={`${editorialFont.className} relative z-10 whitespace-nowrap text-[clamp(3.25rem,8.4vw,7rem)] leading-[0.88] tracking-[-0.06em] text-stone-950`}
						>
							{titleWords.map((word, index) => (
								<span
									key={word}
									className="hero-title-word inline-block px-[0.08em]"
									style={{ "--index": index } as CSSProperties}
								>
									{word}
								</span>
							))}
						</h1>

						<nav className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-6">
							{navigationLinks.map((item, index) => (
								<Link
									key={item.label}
									href={item.href}
									className="hero-link-reveal group relative overflow-hidden rounded-full border border-stone-900/10 bg-white/55 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-stone-700 backdrop-blur-sm transition-colors duration-300 hover:border-stone-900/20 hover:text-stone-950"
									style={{ "--index": index } as CSSProperties}
								>
									<span className="absolute inset-x-4 bottom-2 h-px origin-left scale-x-0 bg-stone-950 transition-transform duration-300 ease-out group-hover:scale-x-100" />
									<span className="relative z-10">{item.label}</span>
								</Link>
							))}
						</nav>
					</div>
				</div>
			</section>

			<div id="contact" className="sr-only">
				Contact placeholder
			</div>
			<div id="about-me" className="sr-only">
				About me placeholder
			</div>
			<div id="portfolio" className="sr-only">
				Portfolio placeholder
			</div>
			<div id="experience" className="sr-only">
				Experience placeholder
			</div>
		</main>
	);
}
