import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "Agustina Presta | Growth & Performance Marketing Strategist",
	description:
		"Soy Agustina Presta. En este sitio presento mi trabajo en growth, performance marketing, social media y estrategia de contenidos desde Buenos Aires.",
	applicationName: "Agustina Presta",
	authors: [{ name: "Agustina Presta" }],
	creator: "Agustina Presta",
	keywords: [
		"Agustina Presta",
		"Growth Marketing",
		"Performance Marketing",
		"Social Media Manager",
		"Community Manager",
		"Estrategia de contenidos",
		"Portfolio marketing",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="es-AR"
			suppressHydrationWarning
			className={cn(
				"antialiased",
				fontMono.variable,
				"font-sans",
				manrope.variable,
			)}
		>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
