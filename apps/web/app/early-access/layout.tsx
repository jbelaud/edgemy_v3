import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Early Access | Edgemy - Plateforme de coaching poker",
  description: "Rejoignez l'Early Access d'Edgemy et soyez parmi les premiers à découvrir la plateforme qui révolutionne le coaching poker. Accès anticipé, tarifs préférentiels et fonctionnalités exclusives.",
}

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 