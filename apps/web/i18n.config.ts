import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr' as const;

export const pathnames = {
  '/': '/',
  '/coachs': '/coachs',
  '/blog': '/blog',
} as const;

export type AppPathnames = keyof typeof pathnames;

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    return {
      locale: defaultLocale,
      messages: {},
      timeZone: 'Europe/Paris'
    };
  }
  
  if (!locales.includes(locale as (typeof locales)[number])) {
    return {
      locale: defaultLocale,
      messages: {},
      timeZone: 'Europe/Paris'
    };
  }
  
  const messages = await Promise.all(
    ['common', 'home', 'auth', 'footer'].map(ns =>
      import(`./messages/${locale}/${ns}.json`).then((mod) => mod.default)
    )
  );

  return {
    locale,
    messages: Object.assign({}, ...messages),
    timeZone: 'Europe/Paris'
  };
}); 