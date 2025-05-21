import { Header } from "@/components/header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
    </>
  )
} 