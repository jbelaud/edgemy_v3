'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@workspace/ui"
import { Input } from "@workspace/ui"
import { Badge } from "@workspace/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui"
import { Download, LogOut, Search, Users, GraduationCap, Brain, Trophy } from "lucide-react"

type WaitlistRole = 'FUTUR_ELEVE' | 'FUTUR_COACH_POKER' | 'FUTUR_COACH_MENTAL'

interface WaitlistEntry {
  id: string
  email: string
  lastName: string
  firstName: string
  createdAt: Date
  role: WaitlistRole
}

export default function WaitlistPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [filteredWaitlist, setFilteredWaitlist] = useState<WaitlistEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<WaitlistRole | 'all'>('all')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        router.push('/admin/login')
      }
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Email', 'Nom', 'Prénom', 'Rôle', 'Date d\'inscription']
    const csvContent = [
      headers.join(','),
      ...filteredWaitlist.map(entry => [
        entry.email,
        entry.lastName,
        entry.firstName,
        getRoleLabel(entry.role),
        new Date(entry.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `waitlist_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`)
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données')
        }
        const data = await response.json()
        setWaitlist(data)
        setFilteredWaitlist(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchWaitlist()
  }, [])

  useEffect(() => {
    const filtered = waitlist.filter(entry => {
      const matchesSearch = 
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRole = selectedRole === 'all' || entry.role === selectedRole
      
      return matchesSearch && matchesRole
    })
    
    setFilteredWaitlist(filtered)
  }, [searchTerm, selectedRole, waitlist])

  const getRoleBadgeVariant = (role: WaitlistRole) => {
    switch (role) {
      case 'FUTUR_ELEVE':
        return 'secondary'
      case 'FUTUR_COACH_POKER':
        return 'default'
      case 'FUTUR_COACH_MENTAL':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getRoleLabel = (role: WaitlistRole) => {
    switch (role) {
      case 'FUTUR_ELEVE':
        return 'Élève'
      case 'FUTUR_COACH_POKER':
        return 'Coach Poker'
      case 'FUTUR_COACH_MENTAL':
        return 'Coach Mental'
      default:
        return role
    }
  }

  const getStats = () => {
    const stats = {
      total: waitlist.length,
      byRole: {
        FUTUR_ELEVE: 0,
        FUTUR_COACH_POKER: 0,
        FUTUR_COACH_MENTAL: 0
      }
    }

    waitlist.forEach(entry => {
      stats.byRole[entry.role]++
    })

    return stats
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          <p className="text-xl font-semibold">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liste d'attente</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exporter CSV
          </Button>
        </div>
      </div>

      {/* Tableau de bord des statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStats().total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Futurs Élèves</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStats().byRole.FUTUR_ELEVE}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Futurs Coachs Poker</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStats().byRole.FUTUR_COACH_POKER}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Futurs Coachs Mental</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStats().byRole.FUTUR_COACH_MENTAL}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par email, nom ou prénom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as WaitlistRole | 'all')}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">Tous les rôles</option>
          <option value="FUTUR_ELEVE">Élèves</option>
          <option value="FUTUR_COACH_POKER">Coach poker</option>
          <option value="FUTUR_COACH_MENTAL">Coach mental</option>
        </select>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'inscription
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWaitlist.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Aucune inscription trouvée
                </td>
              </tr>
            ) : (
              filteredWaitlist.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge variant={getRoleBadgeVariant(entry.role)}>
                      {getRoleLabel(entry.role)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 