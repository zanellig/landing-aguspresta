"use client";

import { getCalApi } from "@calcom/embed-react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import FireflyEffect from "@/components/ui/firefly";
import { CurvedText } from "@/components/curved-text";
import { GridMotion } from "@/components/grid-motion";
import {
	IconBrandInstagram,
	IconBrandLinkedin,
	IconMail,
	IconArrowDown,
	IconSparkles,
	IconTrendingUp,
	IconUsers,
	IconPalette,
	IconVideo,
	IconChartBar,
	IconCalendar,
	IconMessageCircle,
} from "@tabler/icons-react";

const editorialFont = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const titleWords = ["Where", "Attention", "Becomes", "Momentum"];

const navigationLinks = [
	{ href: "#about", label: "About" },
	{ href: "#services", label: "Services" },
	{ href: "#experience", label: "Experience" },
	{ href: "#contact", label: "Contact" },
];

const services = [
	{
		icon: IconTrendingUp,
		title: "Growth Marketing",
		description:
			"Estrategias de crecimiento orgánico y paid para escalar tu presencia digital.",
	},
	{
		icon: IconUsers,
		title: "Community Management",
		description:
			"Gestión integral de comunidades, moderación y engagement con tu audiencia.",
	},
	{
		icon: IconPalette,
		title: "Content Strategy",
		description:
			"Planificación de calendarios editoriales y conceptos creativos para redes.",
	},
	{
		icon: IconVideo,
		title: "Video Production",
		description:
			"Edición y producción de contenido audiovisual para reels, stories y más.",
	},
	{
		icon: IconChartBar,
		title: "Analytics & Reports",
		description:
			"Análisis de métricas y reportes detallados para optimizar resultados.",
	},
	{
		icon: IconMessageCircle,
		title: "Copywriting",
		description:
			"Redacción creativa y persuasiva adaptada a cada plataforma y audiencia.",
	},
];

const experiences = [
	{
		role: "Analista de Marketing",
		company: "AMK Brokers",
		period: "Dic 2025 – Actualidad",
		type: "Jornada completa",
	},
	{
		role: "Directora de Marketing",
		company: "ISIMO COMPANY",
		period: "Oct 2025 – Actualidad",
		type: "Jornada parcial",
	},
	{
		role: "Social Media Manager",
		company: "Lead Station",
		period: "Jul 2025 – Actualidad",
		type: "Freelance",
	},
	{
		role: "Content & Marketing Strategist",
		company: "Spot Studio",
		period: "Abr 2024 – Dic 2025",
		type: "Híbrido",
	},
	{
		role: "Head of Marketing",
		company: "State of Chaos",
		period: "Ago 2023 – Jul 2025",
		type: "Remoto",
	},
	{
		role: "Community Manager",
		company: "Agencia D'Artagnan",
		period: "Ago 2023 – Feb 2025",
		type: "Remoto",
	},
];

const marqueeItems = [
	"Social Media",
	"Growth Marketing",
	"Content Strategy",
	"Community Management",
	"Brand Strategy",
	"Video Editing",
	"Copywriting",
	"Analytics",
];

const clientLogos = [
	"Makro",
	"Bayer",
	"Desiderata",
	"WeWork",
	"Crown Mustang",
	"Thames Denim",
];

export default function Page() {
	const [activeSection, setActiveSection] = useState("");
	const observerRef = useRef<IntersectionObserver | null>(null);

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

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				}
			},
			{ threshold: 0.3 }
		);

		const sections = document.querySelectorAll("section[id]");
		for (const section of sections) {
			observerRef.current?.observe(section);
		}

		return () => observerRef.current?.disconnect();
	}, []);

	return (
		<main className="relative min-h-screen overflow-hidden bg-background text-foreground">
			{/* Background Effects */}
			<div className="pointer-events-none fixed inset-0 z-0">
				<FireflyEffect
					circleCount={1400}
					speedFactor={0.1}
					minRadius={0.5}
					maxRadius={4}
					focusRadius={500}
					glowIntensity={14}
					maxOpacity={0.5}
					minOpacity={0}
					followCursor={true}
					backgroundColor="#f7f4ed"
					color1="#166534"
					color2="#22c55e"
					color3="#8B5CF6"
					color4="#c084fc"
				/>
			</div>
			<div className="grain-overlay pointer-events-none fixed inset-0 z-[1]" />
			<div className="grid-pattern pointer-events-none fixed inset-0 z-[1] opacity-40" />

			{/* Navigation */}
			<nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
				<Link
					href="#hero"
					className="text-lg font-bold tracking-tight text-primary"
				>
					AP
				</Link>
				<div className="flex items-center gap-1 rounded-full border border-border/50 bg-card/80 px-2 py-1.5 backdrop-blur-md sm:gap-2">
					{navigationLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 sm:px-4 sm:text-sm ${
								activeSection === link.href.slice(1)
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>
			</nav>

			{/* Hero Section */}
			<section
				id="hero"
				className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 sm:px-10 lg:px-16"
			>
				<div className="flex max-w-5xl flex-col items-center text-center">
					{/* Curved rotating text */}
					<div className="absolute -left-10 top-32 opacity-20 sm:left-10 sm:top-40 sm:opacity-30 lg:left-20">
						<CurvedText
							text="Growth Marketing • Social Media • "
							speed={0.2}
							size={180}
							className="text-primary"
						/>
					</div>

					<div className="relative z-20 mb-6 overflow-hidden">
						<p className="hero-name-reveal inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
							<IconSparkles className="size-3.5" />
							Agustina Presta
						</p>
					</div>

					<h1
						className={`${editorialFont.className} relative z-10 text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-foreground`}
					>
						{titleWords.map((word, index) => (
							<span
								key={word}
								className="hero-title-word inline-block px-[0.06em]"
								style={{ "--index": index } as CSSProperties}
							>
								{word === "Attention" ? (
									<span className="text-gradient-purple">{word}</span>
								) : word === "Momentum" ? (
									<span className="text-gradient-green">{word}</span>
								) : (
									word
								)}
							</span>
						))}
					</h1>

					<p className="hero-name-reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						Growth & Performance Marketing Strategist especializada en construir
						comunidades, crear contenido que conecta y escalar marcas digitales.
					</p>

					<div className="hero-link-reveal mt-10 flex flex-wrap items-center justify-center gap-4" style={{ "--index": 0 } as CSSProperties}>
						<Link
							href="#contact"
							className="group relative overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
						>
							<span className="relative z-10">Trabajemos juntos</span>
						</Link>
						<Link
							href="#services"
							className="group flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card"
						>
							<span>Ver servicios</span>
							<IconArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
						</Link>
					</div>

					{/* Social links */}
					<div className="hero-link-reveal mt-12 flex items-center gap-4" style={{ "--index": 1 } as CSSProperties}>
						<a
							href="https://www.linkedin.com/in/agustinapresta"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border border-border/50 bg-card/50 p-3 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-card hover:text-primary"
							aria-label="LinkedIn"
						>
							<IconBrandLinkedin className="size-5" />
						</a>
						<a
							href="https://instagram.com/agustinapresta"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border border-border/50 bg-card/50 p-3 text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:bg-card hover:text-accent"
							aria-label="Instagram"
						>
							<IconBrandInstagram className="size-5" />
						</a>
						<a
							href="mailto:contacto@agustinapresta.com"
							className="rounded-full border border-border/50 bg-card/50 p-3 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-card hover:text-primary"
							aria-label="Email"
						>
							<IconMail className="size-5" />
						</a>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						<span className="text-xs uppercase tracking-widest">Scroll</span>
						<div className="h-12 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
					</div>
				</div>
			</section>

			{/* Marquee Section */}
			<section className="relative z-10 border-y border-border/50 bg-card/30 py-4 backdrop-blur-sm">
				<div className="marquee-container">
					<div className="marquee-content">
						{[...marqueeItems, ...marqueeItems].map((item, i) => (
							<span
								key={i}
								className="mx-8 flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-muted-foreground"
							>
								<span
									className={`size-2 rounded-full ${
										i % 2 === 0 ? "bg-primary" : "bg-accent"
									}`}
								/>
								{item}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section
				id="about"
				className="relative z-10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
			>
				<div className="mx-auto max-w-6xl">
					<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
						<div>
							<p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
								Sobre mí
							</p>
							<h2
								className={`${editorialFont.className} text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl`}
							>
								Creando conexiones
								<br />
								<span className="text-gradient-green">que importan</span>
							</h2>
						</div>

						<div className="flex flex-col justify-center">
							<p className="text-lg leading-relaxed text-muted-foreground">
								Hola! Soy Agus, tengo 22 años y actualmente soy estudiante de la
								Licenciatura en Marketing (UCES, 3er año), Community Manager y
								Social Media Manager.
							</p>
							<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
								Comencé mi etapa laboral en 2021 y hasta el día de hoy continúo
								ejerciendo tanto en Agencias como Freelance. Entre mis tareas se
								encuentra el diseño de piezas gráficas, investigación y armado de
								estrategias, calendarios de contenido, moderación y análisis de
								métricas.
							</p>
							<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
								Cuento con amplia experiencia en segmentos diversos: gastronomía,
								gaming, tecnología, entidades bancarias, decoración, marcas
								personales y moda.
							</p>

							<div className="mt-8 flex flex-wrap gap-3">
								{["Marketing Digital", "Social Media", "Content Strategy", "Branding"].map(
									(skill) => (
										<span
											key={skill}
											className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
										>
											{skill}
										</span>
									)
								)}
							</div>
						</div>
					</div>

					{/* Stats */}
					<div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
						{[
							{ value: "+4", label: "Años de experiencia" },
							{ value: "+15", label: "Clientes atendidos" },
							{ value: "+60K", label: "Seguidores generados" },
							{ value: "+10", label: "Industrias" },
						].map((stat, i) => (
							<div
								key={i}
								className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card"
							>
								<p
									className={`${editorialFont.className} text-4xl font-bold text-primary sm:text-5xl`}
								>
									{stat.value}
								</p>
								<p className="mt-2 text-sm text-muted-foreground">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section
				id="services"
				className="relative z-10 bg-gradient-to-b from-transparent via-secondary/30 to-transparent px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
			>
				<div className="mx-auto max-w-6xl">
					<div className="mb-16 text-center">
						<p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
							Servicios
						</p>
						<h2
							className={`${editorialFont.className} text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl`}
						>
							Lo que mejor{" "}
							<span className="text-gradient-purple">hago</span>
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
							Soluciones integrales para hacer crecer tu marca en el mundo
							digital
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{services.map((service, i) => (
							<div
								key={i}
								className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
							>
								<div className="absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10">
									<div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
										<service.icon className="size-6" />
									</div>
									<h3 className="mb-2 text-xl font-semibold text-foreground">
										{service.title}
									</h3>
									<p className="text-muted-foreground">
										{service.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Experience Section */}
			<section
				id="experience"
				className="relative z-10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
			>
				<div className="mx-auto max-w-6xl">
					<div className="mb-16">
						<p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
							Experiencia
						</p>
						<h2
							className={`${editorialFont.className} text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl`}
						>
							Mi trayectoria{" "}
							<span className="text-gradient-green">profesional</span>
						</h2>
					</div>

					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-accent to-transparent sm:left-1/2 sm:block sm:-translate-x-px" />

						<div className="space-y-8">
							{experiences.map((exp, i) => (
								<div
									key={i}
									className={`relative flex flex-col sm:flex-row ${
										i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
									}`}
								>
									{/* Timeline dot */}
									<div className="absolute left-0 top-0 hidden size-3 rounded-full border-2 border-primary bg-background sm:left-1/2 sm:block sm:-translate-x-1/2" />

									{/* Content */}
									<div
										className={`w-full sm:w-1/2 ${
											i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
										}`}
									>
										<div className="group rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card">
											<span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
												{exp.type}
											</span>
											<h3 className="mt-3 text-xl font-semibold text-foreground">
												{exp.role}
											</h3>
											<p className="mt-1 font-medium text-primary">
												{exp.company}
											</p>
											<p className="mt-2 text-sm text-muted-foreground">
												{exp.period}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Clients worked with */}
					<div className="mt-20">
						<p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
							Marcas con las que trabajé
						</p>
						<div className="flex flex-wrap items-center justify-center gap-8">
							{clientLogos.map((client, i) => (
								<div
									key={i}
									className="rounded-lg border border-border/30 bg-card/30 px-6 py-3 text-lg font-semibold text-muted-foreground/60 transition-all duration-300 hover:border-primary/30 hover:text-foreground"
								>
									{client}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Grid Motion Section */}
			<section className="relative z-10 h-[500px] overflow-hidden bg-gradient-to-b from-transparent to-secondary/20">
				<GridMotion
					items={[
						<IconSparkles key="1" className="size-8 text-primary" />,
						<IconTrendingUp key="2" className="size-8 text-accent" />,
						<span key="3" className="text-xs font-bold text-primary">+60K</span>,
						<IconUsers key="4" className="size-8 text-primary" />,
						<IconPalette key="5" className="size-8 text-accent" />,
						<span key="6" className="text-xs font-bold text-accent">SMM</span>,
						<IconChartBar key="7" className="size-8 text-primary" />,
						<IconVideo key="8" className="size-8 text-accent" />,
						<span key="9" className="text-xs font-bold text-primary">ROI</span>,
						<IconCalendar key="10" className="size-8 text-primary" />,
						<IconMessageCircle key="11" className="size-8 text-accent" />,
						<span key="12" className="text-xs font-bold text-accent">UGC</span>,
						<IconBrandInstagram key="13" className="size-8 text-primary" />,
						<IconBrandLinkedin key="14" className="size-8 text-accent" />,
					]}
					gradientColor="oklch(0.965 0.008 85)"
				/>
			</section>

			{/* Contact Section */}
			<section
				id="contact"
				className="relative z-10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
			>
				<div className="mx-auto max-w-4xl text-center">
					<p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
						Contacto
					</p>
					<h2
						className={`${editorialFont.className} text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl`}
					>
						¿Listo para{" "}
						<span className="text-gradient-purple">crecer</span>?
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
						Estoy disponible para proyectos freelance y colaboraciones. Charlemos
						sobre cómo puedo ayudarte a alcanzar tus objetivos de marketing.
					</p>

					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a
							href="mailto:contacto@agustinapresta.com"
							className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
						>
							<IconMail className="size-5" />
							Enviar email
						</a>
						<Link
							href="https://www.linkedin.com/in/agustinapresta"
							target="_blank"
							className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card"
						>
							<IconBrandLinkedin className="size-5" />
							LinkedIn
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 border-t border-border/50 bg-card/30 px-6 py-12 backdrop-blur-sm sm:px-10 lg:px-16">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
					<div className="flex items-center gap-2">
						<span className="text-xl font-bold text-primary">AP</span>
						<span className="text-sm text-muted-foreground">
							© 2026 Agustina Presta
						</span>
					</div>

					<div className="flex items-center gap-4">
						<a
							href="https://www.linkedin.com/in/agustinapresta"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground transition-colors hover:text-primary"
							aria-label="LinkedIn"
						>
							<IconBrandLinkedin className="size-5" />
						</a>
						<a
							href="https://instagram.com/agustinapresta"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground transition-colors hover:text-accent"
							aria-label="Instagram"
						>
							<IconBrandInstagram className="size-5" />
						</a>
						<a
							href="mailto:contacto@agustinapresta.com"
							className="text-muted-foreground transition-colors hover:text-primary"
							aria-label="Email"
						>
							<IconMail className="size-5" />
						</a>
					</div>

					<p className="text-sm text-muted-foreground">
						Buenos Aires, Argentina
					</p>
				</div>
			</footer>
		</main>
	);
}
