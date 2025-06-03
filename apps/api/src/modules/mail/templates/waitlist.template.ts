import { WaitlistRole } from "src/modules/waitlist/enums/waitlist-role.enum";

export function getWaitlistTemplate(firstName: string, role: WaitlistRole) {
  // Conversion du rôle pour l'affichage
  const roleDisplay = role
    .replace('FUTUR_', '') // Supprime le préfixe FUTUR_
    .replace('_', ' ') // Remplace les underscores par des espaces
    .toLowerCase() // Met en minuscules
    .replace(/\b\w/g, l => l.toUpperCase()); // Met la première lettre de chaque mot en majuscule
  
  return {
    subject: "Bienvenue sur la liste d'attente d'Edgemy !",
    html: `
      <h1>Bienvenue ${firstName} !</h1>
      <p>Merci de vous être inscrit sur la liste d'attente d'Edgemy en tant que ${roleDisplay}.</p>
      <p>Nous vous tiendrons informé dès que nous aurons des nouvelles à vous partager.</p>
      <p>À bientôt !</p>
      <p>L'équipe Edgemy</p>
    `
  };
} 