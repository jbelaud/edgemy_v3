import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from '@getbrevo/brevo';
import { EmailTemplate, EmailRecipient } from '../interfaces/email.interface';

@Injectable()
export class BaseMailService {
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not defined');
    }

    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      apiKey as string
    );
  }

  protected async sendEmail(template: EmailTemplate, recipient: EmailRecipient) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = template.subject;
    sendSmtpEmail.htmlContent = template.htmlContent;
    sendSmtpEmail.sender = template.sender;
    sendSmtpEmail.to = [recipient];

    try {
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  }
} 