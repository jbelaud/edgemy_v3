import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { jwtVerify } from 'jose'
import { locales, defaultLocale, nonInternationalizedRoutes } from './i18n.config'

if (!process.env.JWT_SECRET) {
  throw new Error('La variable d\'environnement JWT_SECRET est requise')
}

const JWT_SECRET = process.env.JWT_SECRET
const protectedRoutes = ['/admin']
const authRoutes = ['/admin/login']

// Liste des chemins statiques à mettre en cache
const STATIC_PATHS = [
  '/images',
  '/fonts',
  '/styles',
  '/components/early-access'
]

// Durée de mise en cache en secondes
const CACHE_DURATION = 60 * 60 * 24 * 7 // 7 jours

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    await jwtVerify(token, secret)
    return true
  } catch (error) {
    console.error('Erreur de vérification du token (jose):', error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si le chemin est statique
  const isStaticPath = STATIC_PATHS.some(path => pathname.startsWith(path))

  if (isStaticPath) {
    // Ajouter les headers de cache
    const response = NextResponse.next()
    response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATION}, immutable`)
    return response
  }

  // Vérifier si c'est une route non internationalisée
  if (nonInternationalizedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Rediriger /early-access vers /fr/early-access seulement si ce n'est pas déjà une route localisée
  if (pathname === '/early-access' && !pathname.startsWith('/fr/') && !pathname.startsWith('/en/')) {
    return NextResponse.redirect(new URL('/fr/early-access', request.url))
  }

  // Vérifier si c'est une route protégée
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname === route)

  if (isAuthRoute) {
    const token = request.cookies.get('token')?.value
    if (await verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/waitlist', request.url))
    }
    return NextResponse.next()
  }

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value
    if (!(await verifyToken(token))) {
      const redirectUrl = new URL('/admin/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next()
  }

  // Pour toutes les autres routes, appliquer l'internationalisation
  const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
  })

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Inclure uniquement les routes admin
    '/admin/:path*'
  ]
}