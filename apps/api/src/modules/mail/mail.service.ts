import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as SibApiV3Sdk from '@getbrevo/brevo';
import { WaitlistRole } from '../waitlist/enums/waitlist-role.enum';

@Injectable()
export class MailService {
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;
  private readonly senderName: string;
  private readonly senderEmail: string;

  constructor() {
    // Récupération des variables d'environnement
    const apiKey = process.env.BREVO_API_KEY;
    // En local, on utilise une adresse email temporaire
    const senderEmail = process.env.BREVO_EMAIL_FROM || 'noreply@brevo.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Edgemy';

    console.log('🔧 Configuration Brevo :');
    console.log('- API Key présente:', !!apiKey);
    console.log('- API Key (premiers caractères):', apiKey ? `${apiKey.substring(0, 4)}...` : 'non définie');
    console.log('- Email expéditeur:', senderEmail);
    console.log('- Nom expéditeur:', senderName);

    // Vérification des valeurs
    if (!apiKey) {
      throw new InternalServerErrorException(
        'Configuration Brevo manquante. Vérifiez : BREVO_API_KEY'
      );
    }

    // Initialisation des propriétés
    this.senderEmail = senderEmail;
    this.senderName = senderName;

    // Initialisation de l'API Brevo
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    console.log('✅ API Brevo initialisée avec succès');

    // Vérification de la configuration
    this.verifyConfiguration();
  }

  private async verifyConfiguration() {
    try {
      // Test d'envoi d'email
      const testEmail = new SibApiV3Sdk.SendSmtpEmail();
      testEmail.subject = "Test de configuration Brevo";
      testEmail.htmlContent = "<p>Ceci est un email de test pour vérifier la configuration.</p>";
      testEmail.sender = { name: this.senderName, email: this.senderEmail };
      testEmail.to = [{ email: this.senderEmail, name: this.senderName }];

      const result = await this.apiInstance.sendTransacEmail(testEmail);
      console.log('✅ Test de configuration réussi :', result.body?.messageId);
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de la configuration Brevo:', error);
      throw new InternalServerErrorException('Erreur de configuration Brevo');
    }
  }

  async sendWaitlistConfirmation(email: string, firstName: string, role: WaitlistRole) {
    console.log('📧 Préparation de l\'email de confirmation...');
    console.log('Destinataire:', { email, firstName, role });

    // Validation du rôle
    const validRoles = Object.values(WaitlistRole);
    if (!validRoles.includes(role)) {
      console.error('❌ Rôle invalide:', role);
      throw new BadRequestException(
        `Rôle invalide. Les rôles valides sont : ${validRoles.join(', ')}`
      );
    }

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // Conversion du rôle pour l'affichage
    const roleDisplay = role.replace('FUTUR_', '').replace('_', ' ').toLowerCase();

    // Création du lien de désinscription
    const unsubscribeLink = `https://edgemy.fr/unsubscribe?email=${encodeURIComponent(email)}`;

    sendSmtpEmail.subject = "Bienvenue sur la liste d'attente d'Edgemy !";
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue sur Edgemy</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <!-- En-tête -->
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f4f4f4;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Bienvenue sur Edgemy</h1>
          </div>

          <!-- Contenu principal -->
          <div style="padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Bonjour ${firstName},</h2>
            
            <p style="color: #34495e; line-height: 1.6; margin-bottom: 20px;">
              Merci de vous être inscrit sur la liste d'attente d'Edgemy en tant que <strong>${roleDisplay}</strong>.
            </p>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="color: #34495e; line-height: 1.6; margin: 0;">
                Nous vous tiendrons informé dès que nous aurons des nouvelles à vous partager concernant le lancement de notre plateforme.
              </p>
            </div>

            <p style="color: #34495e; line-height: 1.6;">
              À très bientôt !
            </p>

            <p style="color: #34495e; font-weight: bold;">
              L'équipe Edgemy
            </p>
          </div>

          <!-- Pied de page -->
          <div style="text-align: center; padding: 20px; border-top: 2px solid #f4f4f4; font-size: 12px; color: #7f8c8d;">
            <p style="margin: 0 0 10px 0;">
              Cet email a été envoyé à ${email}
            </p>
            <p style="margin: 0;">
              <a href="${unsubscribeLink}" style="color: #7f8c8d; text-decoration: underline;">
                Se désinscrire de la liste d'attente
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    sendSmtpEmail.sender = { name: this.senderName, email: this.senderEmail };
    sendSmtpEmail.to = [{ email, name: firstName }];
    
    // Ajout des en-têtes pour améliorer la délivrabilité
    sendSmtpEmail.headers = {
      'X-Mailin-Custom': 'custom_header_value',
      'List-Unsubscribe': `<${unsubscribeLink}>`,
      'Precedence': 'bulk',
      'X-Auto-Response-Suppress': 'OOF, AutoReply',
    };

    try {
      console.log('📤 Tentative d\'envoi de l\'email avec les paramètres suivants :');
      console.log('De:', this.senderName, `<${this.senderEmail}>`);
      console.log('À:', firstName, `<${email}>`);
      console.log('Rôle:', role);

      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      
      console.log('✅ Email envoyé avec succès. ID du message:', data.body?.messageId);
      return data;
    } catch (error) {
      console.error('❌ Erreur détaillée lors de l\'envoi de l\'email:', {
        message: error.message,
        code: error.code,
        response: error.response?.body
      });
      throw new InternalServerErrorException('Erreur lors de l\'envoi de l\'email de confirmation');
    }
  }

  async testEmailConfiguration() {
    try {
      console.log('🔧 Test de la configuration Brevo...');
      console.log('Configuration actuelle:');
      console.log('- API Key présente:', !!process.env.BREVO_API_KEY);
      console.log('- Email expéditeur:', process.env.BREVO_EMAIL_FROM);
      console.log('- Nom expéditeur:', process.env.BREVO_SENDER_NAME);

      const testEmail = new SibApiV3Sdk.SendSmtpEmail();
      testEmail.subject = "Test de configuration Brevo";
      testEmail.htmlContent = "<p>Ceci est un email de test pour vérifier la configuration.</p>";
      testEmail.sender = { name: this.senderName, email: this.senderEmail };
      testEmail.to = [{ email: this.senderEmail, name: this.senderName }];

      const result = await this.apiInstance.sendTransacEmail(testEmail);
      console.log('✅ Test de configuration réussi :', result.body?.messageId);
      return { success: true, messageId: result.body?.messageId };
    } catch (error) {
      console.error('❌ Erreur lors du test de configuration:', error);
      return { 
        success: false, 
        error: {
          message: error.message,
          code: error.code,
          response: error.response?.body
        }
      };
    }
  }
}
