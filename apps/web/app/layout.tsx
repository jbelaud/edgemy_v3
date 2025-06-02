import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Edgemy - Plateforme de coaching poker",
  description: "Edgemy est la plateforme qui révolutionne l'apprentissage du poker.",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  )
}