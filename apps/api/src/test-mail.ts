import { NestFactory } from '@nestjs/core';
import { MailModule } from './modules/mail/mail.module';
import { MailController } from './modules/mail/mail.controller';
import { WaitlistRole } from './modules/waitlist/enums/waitlist-role.enum';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Chargement des variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testEmail() {
  console.log('Démarrage du test d\'envoi d\'email...');
  console.log('Vérification de la clé API Brevo:', process.env.BREVO_API_KEY ? 'Présente' : 'Manquante');
  
  const app = await NestFactory.createApplicationContext(MailModule);
  const mailController = app.get(MailController);

  try {
    const result = await mailController.testEmail({
      email: 'test@example.com', // Remplacez par votre adresse email de test
      firstName: 'Test',
      role: WaitlistRole.FUTUR_COACH_POKER
    });

    console.log('Résultat:', result);
  } catch (error) {
    console.error('Erreur détaillée:', {
      message: error.message,
      stack: error.stack
    });
  } finally {
    await app.close();
  }
}

testEmail(); 