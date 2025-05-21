import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Liste d'attente",
  description: "Gestion des inscriptions à la liste d'attente",
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 