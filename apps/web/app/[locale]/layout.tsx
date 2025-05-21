// app/[locale]/layout.tsx
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { locales } from '@/i18n.config'
import { getMessages } from '@/lib/i18n'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Vérification de la locale
  const locale = await Promise.resolve(params?.locale)
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const messages = await getMessages(locale, ['common', 'auth', 'home', 'footer', 'early-access'])

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          now={new Date()}
          timeZone="Europe/Paris"
        >
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}