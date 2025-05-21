import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { RateLimiter } from 'limiter';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createHash } from 'crypto';
import { WaitlistRole } from '@prisma/client';

// URL de l'API backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Schéma de validation
const WaitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  firstName: z.string().min(2).max(50),
  role: z.enum(['FUTUR_ELEVE', 'FUTUR_COACH_POKER', 'FUTUR_COACH_MENTAL'])
});

// Rate limiter par IP
const ipLimiters = new Map<string, RateLimiter>();

// Configuration du rate limiter
const RATE_LIMIT = {
  points: 5, // Nombre de requêtes
  duration: 3600, // Par heure
  blockDuration: 3600 // Blocage d'une heure en cas de dépassement
};

// Fonction pour obtenir l'IP du client
async function getClientIP(headersList: ReturnType<typeof headers>): Promise<string> {
  const forwardedFor = (await headersList).get('x-forwarded-for');
  if (!forwardedFor) {
    return 'unknown';
  }
  const firstIP = forwardedFor.split(',')[0];
  return firstIP ? firstIP.trim() : 'unknown';
}

// Fonction pour vérifier le token CSRF
function verifyCSRFToken(headers: Headers): boolean {
  const csrfToken = headers.get('x-csrf-token');
  const origin = headers.get('origin');
  
  // Vérification basique - à adapter selon votre stratégie CSRF
  if (!csrfToken || !origin) return false;
  
  // Ici, vous devriez implémenter votre logique de vérification CSRF
  // Par exemple, comparer avec un token stocké en session
  return true;
}

// Fonction pour hacher l'email
function hashEmail(email: string): string {
  return createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📨 Réception de la demande d\'inscription:', body);
    
    // Validation des données
    const validatedData = WaitlistSchema.parse(body);
    console.log('✅ Données validées:', validatedData);

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.waitlist.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      console.log('❌ Email déjà existant:', validatedData.email);
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit' },
        { status: 409 }
      );
    }

    // Créer l'inscription
    console.log('💾 Création de l\'inscription dans la base de données...');
    const user = await prisma.waitlist.create({
      data: {
        email: validatedData.email,
        lastName: validatedData.name,
        firstName: validatedData.firstName,
        role: validatedData.role as any // On force le type pour l'instant
      }
    });
    console.log('✅ Inscription créée avec succès:', user);

    // Envoyer l'email de confirmation via l'API NestJS
    console.log('📧 Tentative d\'envoi de l\'email via l\'API NestJS...');
    try {
      const emailResponse = await fetch(`${API_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: validatedData.email,
          firstName: validatedData.firstName,
          lastName: validatedData.name,
          role: validatedData.role
        }),
      });

      if (!emailResponse.ok) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', await emailResponse.text());
      } else {
        console.log('✅ Email envoyé avec succès');
      }
    } catch (emailError) {
      console.error('❌ Erreur lors de l\'appel à l\'API NestJS:', emailError);
    }

    return NextResponse.json(
      { message: 'Inscription réussie', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const response = await fetch(`${API_URL}/waitlist`, {
      headers: {
        'Cookie': (await headers()).get('cookie') || '',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    )
  }
}

// Nettoyage périodique des rate limiters
setInterval(() => {
  for (const [ip, limiter] of ipLimiters.entries()) {
    // Vérification basée sur le nombre de tokens restants
    if (limiter.getTokensRemaining() === RATE_LIMIT.points) {
      ipLimiters.delete(ip);
    }
  }
}, 3600000); // Nettoyage toutes les heures 