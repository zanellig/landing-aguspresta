import type { Metadata } from "next"
import { Geist_Mono, Manrope } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Agustina Presta | Growth & Performance Marketing Strategist",
  description:
    "Soy Agustina Presta, Growth & Performance Marketing Strategist desde Buenos Aires. Especializada en social media, community management, content strategy y marketing digital. +4 años de experiencia construyendo comunidades y escalando marcas.",
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
    "Marketing Digital Argentina",
    "Content Strategy",
    "Buenos Aires Marketing",
  ],
  openGraph: {
    title: "Agustina Presta | Growth & Performance Marketing Strategist",
    description:
      "Growth & Performance Marketing Strategist especializada en social media, community management y content strategy desde Buenos Aires.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustina Presta | Growth & Performance Marketing",
    description:
      "Growth & Performance Marketing Strategist especializada en social media y content strategy.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-AR"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        manrope.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
