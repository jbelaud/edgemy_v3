import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

// URL de l'API backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('Tentative de connexion avec:', {
      email: body.email,
      adminEmail: process.env.ADMIN_EMAIL,
      passwordMatch: body.password === process.env.ADMIN_PASSWORD
    });

    // Vérifier les identifiants
    if (body.email === process.env.ADMIN_EMAIL && body.password === process.env.ADMIN_PASSWORD) {
      // Créer le token JWT
      const token = sign(
        { email: body.email, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Créer la réponse
      const response = NextResponse.json({ success: true });

      // Définir le cookie dans la réponse
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 heures
      });

      console.log('Connexion réussie, cookie défini');
      return response;
    }

    console.log('Identifiants invalides');
    return NextResponse.json(
      { message: 'Identifiants invalides' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    );
  }
} 