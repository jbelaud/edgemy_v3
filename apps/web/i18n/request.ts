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
      const filePath = path.join(process.cwd(), 'messages', locale, `${ns}.json`);
      console.log(`📂 Loading messages from: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File does not exist: ${filePath}`);
        continue;
      }

      const data = JSON.parse(
        fs.readFileSync(filePath, 'utf-8')
      );

      if (!data || typeof data !== 'object') {
        console.warn(`⚠️ Invalid JSON data in: ${filePath}`);
        continue;
      }

      messages[ns] = data;
      console.log(`✅ Successfully loaded ${ns} messages for ${locale}`);
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
  const messages = loadMessages(locale);

  if (Object.keys(messages).length === 0 && locale !== 'fr') {
    console.warn(`🔁 No messages found for ${locale}, falling back to French`);
    return {
      locale: 'fr',
      messages: loadMessages('fr'),
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
