import { NextRequest, NextResponse } from 'next/server';

// URL de l'API backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/waitlist/export/csv`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'export des données' },
        { status: response.status }
      );
    }

    // Récupérer le contenu CSV
    const csvContent = await response.text();
    
    // Créer la réponse avec les bons headers
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="waitlist-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de l\'export :', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'export' },
      { status: 500 }
    );
  }
} 