import type { Metadata } from "next"
import dynamic from 'next/dynamic'
import Header from "@/components/early-access/Header"
import HeroSection from "@/components/early-access/HeroSection"
import Footer from "@/components/early-access/Footer"
import ScrollToTopButton from "@/components/early-access/ScrollToTopButton"

// Lazy loading des composants lourds
const Faq = dynamic(() => import("@/components/early-access/Faq"), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center">Chargement...</div>
})

const CTASection = dynamic(() => import("@/components/early-access/CTASection"), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center">Chargement...</div>
})

const MarketSection = dynamic(() => import("@/components/early-access/MarketSection"), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center">Chargement...</div>
})

const Pricing = dynamic(() => import("@/components/early-access/Pricing"), {
  loading: () => <div className="min-h-[500px] flex items-center justify-center">Chargement...</div>
})

const Roadmap = dynamic(() => import("@/components/early-access/Roadmap"), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center">Chargement...</div>
})

export const metadata: Metadata = {
  title: "Early Access | Edgemy - Plateforme de coaching poker",
  description: "Rejoignez l'Early Access d'Edgemy et soyez parmi les premiers à découvrir la plateforme qui révolutionne le coaching poker. Accès anticipé, tarifs préférentiels et fonctionnalités exclusives.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  referrer: "strict-origin-when-cross-origin",
  themeColor: "#4F46E5",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://edgemy.fr/early-access",
    siteName: "Edgemy",
    title: "Early Access | Edgemy - Plateforme de coaching poker",
    description: "Rejoignez l'Early Access d'Edgemy et soyez parmi les premiers à découvrir la plateforme qui révolutionne le coaching poker.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Edgemy Early Access",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Early Access | Edgemy - Plateforme de coaching poker",
    description: "Rejoignez l'Early Access d'Edgemy et soyez parmi les premiers à découvrir la plateforme qui révolutionne le coaching poker.",
    images: ["/images/twitter-image.jpg"],
  },
}

export default function EarlyAccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <MarketSection />
        <section id="inscription">
          <CTASection />
        </section>
        <Roadmap />
        <Pricing />
        <Faq />
        <section id="waitlist">
          <CTASection />
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
} 