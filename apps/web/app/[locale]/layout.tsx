import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { notFound, redirect } from "next/navigation"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { getMessages } from "@/lib/i18n"
import { locales, defaultLocale } from "@/i18n.config"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Edgemy | Plateforme de coaching poker",
  description: "Améliorez votre jeu de poker avec des coachs professionnels et développez votre mental",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = (await Promise.resolve(params)).locale;

  if (!locales.includes(locale as (typeof locales)[number])) {
    redirect(`/${defaultLocale}`);
  }

  const messages = await getMessages(locale, ['common', 'auth', 'home', 'footer']);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

