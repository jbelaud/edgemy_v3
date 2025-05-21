import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Total des inscriptions
    const totalSubscriptions = await prisma.waitlist.count()

    // Inscriptions par jour (7 derniers jours)
    const last7Days = await prisma.waitlist.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: {
        createdAt: 'desc'
      },
      take: 7
    })

    // Dernières inscriptions
    const latestSubscriptions = await prisma.waitlist.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    return NextResponse.json({
      totalSubscriptions,
      subscriptionsByDay: last7Days.map(day => ({
        date: day.createdAt,
        count: day._count
      })),
      latestSubscriptions
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
} 