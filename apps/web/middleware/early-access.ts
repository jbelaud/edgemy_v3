import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // On laisse simplement passer la requête sans aucune redirection
  return NextResponse.next()
}

export const config = {
  matcher: ['/early-access/:path*']
} 
