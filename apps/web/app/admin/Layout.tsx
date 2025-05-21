import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Administration",
  description: "Interface d'administration",
}

async function checkAuth() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`, {
    cache: 'no-store'
  })
  return response.ok
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkAuth()
  const pathname = '/admin' // Par défaut, on redirige vers la page admin

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}
