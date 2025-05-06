import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
} 