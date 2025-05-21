import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr' as const;

// Routes qui ne doivent pas être internationalisées
export const nonInternationalizedRoutes = [
  '/admin',
  '/early-access',
  '/api',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

export const pathnames = {
  '/': '/',
  '/coachs': '/coachs',
  '/blog': '/blog',
  '/admin': '/admin',
  '/early-access': '/early-access'
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
  
  try {
    const messages = await Promise.all(
      ['common', 'home', 'auth', 'footer', 'early-access'].map(async (ns) => {
        try {
          const module = await import(`./messages/${locale}/${ns}.json`);
          return { [ns]: module.default };
        } catch (error) {
          console.error(`Error loading messages for namespace ${ns} and locale ${locale}:`, error);
          return { [ns]: {} };
        }
      })
    );

    const mergedMessages = messages.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    return {
      locale,
      messages: mergedMessages,
      timeZone: 'Europe/Paris'
    };
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return {
      locale: defaultLocale,
      messages: {},
      timeZone: 'Europe/Paris'
    };
  }
}); 