import { getRequestConfig } from 'next-intl/server';
import { locales } from '../i18n.config';

type Messages = Record<string, unknown>;

async function loadMessages(locale: string): Promise<Messages> {
  const namespaces = ['common', 'home', 'auth', 'footer', 'contact'];
  const messages: Messages = {};

  for (const ns of namespaces) {
    try {
      // Utiliser import dynamique au lieu de fs pour compatibilité Edge Runtime
      const messageModule = await import(`../messages/${locale}/${ns}.json`).catch(() => null);
      
      if (messageModule?.default) {
        messages[ns] = messageModule.default;
        console.log(`✅ Successfully loaded ${ns} messages for ${locale}`);
      } else {
        console.warn(`⚠️ No messages found for ${locale}/${ns}.json`);
      }
    } catch (err) {
      console.error(`❌ Error loading messages for ${locale}/${ns}.json:`, err);
    }
  }

  return messages;
}

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    console.log(`⚠️ Invalid locale: ${locale}, falling back to fr`);
    locale = 'fr';
  }

  console.log(`🌍 Loading messages for locale: ${locale}`);
  const messages = await loadMessages(locale);

  if (Object.keys(messages).length === 0 && locale !== 'fr') {
    console.warn(`🔁 No messages found for ${locale}, falling back to French`);
    return {
      locale: 'fr',
      messages: await loadMessages('fr'),
      timeZone: 'Europe/Paris'
    };
  }

  console.log(`✅ Loaded namespaces: ${Object.keys(messages).join(', ')}`);
  return {
    locale,
    messages,
    timeZone: 'Europe/Paris'
  };
});
