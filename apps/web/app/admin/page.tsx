import { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui"
import { 
  Users, 
  GraduationCap, 
  Brain, 
  Trophy,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord administrateur",
}

async function getStats() {
  const total = await prisma.waitlist.count()
  const byRole = await prisma.waitlist.groupBy({
    by: ['role'],
    _count: true
  })
  
  const recentSignups = await prisma.waitlist.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    total,
    byRole,
    recentSignups
  }
}

export default async function AdminPage() {
  const stats = await getStats()
  
  const roleCounts = {
    FUTUR_ELEVE: 0,
    FUTUR_COACH_POKER: 0,
    FUTUR_COACH_MENTAL: 0
  }
  
  stats.byRole.forEach(role => {
    roleCounts[role.role] = role._count
  })

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      
      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Futurs Élèves</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleCounts.FUTUR_ELEVE}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Futurs Coachs Poker</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleCounts.FUTUR_COACH_POKER}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Futurs Coachs Mental</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleCounts.FUTUR_COACH_MENTAL}</div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des dernières inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières inscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentSignups.map((signup) => (
              <div key={signup.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{signup.firstName} {signup.lastName}</p>
                  <p className="text-sm text-muted-foreground">{signup.email}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {signup.role.replace('FUTUR_', '').replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liens rapides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link 
          href="/admin/waitlist"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold mb-2">Liste d'attente complète</h2>
          <p className="text-gray-600">Voir et gérer toutes les inscriptions</p>
        </Link>
      </div>
    </div>
  )
}
