// lib/i18n.ts
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n.config';

export async function getMessages(
  locale: string, 
  namespaces: string[] = ['common']
): Promise<Record<string, any>> {
  // Validation de la locale
  if (!locales.includes(locale as any)) {
    console.warn(`Invalid locale: ${locale}, falling back to ${defaultLocale}`);
    locale = defaultLocale;
  }

  try {
    const messages = await Promise.all(
      namespaces.map(async (ns) => {
        try {
          const module = await import(`@/messages/${locale}/${ns}.json`);
          return { [ns]: module.default };
        } catch (error) {
          console.warn(`Missing namespace ${ns} for locale ${locale}, trying fallback...`);
          
          // Essayer de charger la version par défaut (fr)
          if (locale !== defaultLocale) {
            try {
              const fallbackModule = await import(`@/messages/${defaultLocale}/${ns}.json`);
              return { [ns]: fallbackModule.default };
            } catch (fallbackError) {
              console.error(`Missing fallback namespace ${ns} for default locale ${defaultLocale}`);
              return { [ns]: {} };
            }
          }
          
          return { [ns]: {} };
        }
      })
    );

    // Fusionner tous les namespaces
    const mergedMessages = messages.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    // Vérifier si on a au moins le namespace 'common'
    if (!mergedMessages.common && namespaces.includes('common')) {
      console.error('Critical: Missing common namespace even after fallback');
      throw new Error('Missing required common namespace');
    }

    return mergedMessages;
  } catch (error) {
    console.error('Failed to load messages:', error);
    notFound();
  }
}