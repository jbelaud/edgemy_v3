import { getRequestConfig } from 'next-intl/server';
import { locales } from '../i18n.config';
import fs from 'fs';
import path from 'path';

type Messages = Record<string, unknown>;

function loadMessages(locale: string): Messages {
  const namespaces = ['common', 'home', 'auth', 'footer'];
  const messages: Messages = {};

  for (const ns of namespaces) {
    try {
      const data = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), 'messages', locale, `${ns}.json`),
          'utf-8'
        )
      );

      messages[ns] = data;
    } catch (err) {
      console.warn(`⚠️ Missing or invalid namespace file: ${locale}/${ns}.json`);
    }
  }

  return messages;
}

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    locale = 'fr';
  }

  const messages = loadMessages(locale);

  if (Object.keys(messages).length === 0 && locale !== 'fr') {
    console.warn(`🔁 Falling back to French messages`);
    return {
      locale: 'fr',
      messages: loadMessages('fr'),
      timeZone: 'Europe/Paris'
    };
  }

  return {
    locale,
    messages,
    timeZone: 'Europe/Paris'
  };
});
