import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      console.log('Pas de token trouvé');
      return NextResponse.json(
        { authenticated: false, message: 'Non authentifié' },
        { status: 401 }
      );
    }

    try {
      // Vérifier le token avec jose
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      console.log('Token valide (jose)');
      return NextResponse.json({ authenticated: true });
    } catch (error) {
      console.error('Erreur de vérification du token (jose):', error);
      return NextResponse.json(
        { authenticated: false, message: 'Session invalide' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}