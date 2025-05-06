// lib/i18n.ts
export async function getMessages(locale: string, namespaces: string[] = ['common']) {
  const messages = await Promise.all(
    namespaces.map(async (ns) => {
      try {
        // Importation dynamique des fichiers JSON de traduction
        const mod = await import(`@/messages/${locale}/${ns}.json`);
        return { [ns]: mod.default };
      } catch (err) {
        // En cas de fichier manquant, on log l'erreur et on retourne un objet vide
        console.warn(`Missing translation file: ${locale}/${ns}.json`);
        return { [ns]: {} };
      }
    })
  );

  // Fusionner toutes les traductions de namespaces
  return messages.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
