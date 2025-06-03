import { Controller, Post, Body, Get } from '@nestjs/common';
import { WaitlistMailService } from './services/waitlist-mail.service';
import { WaitlistRole } from '../waitlist/enums/waitlist-role.enum';
import { MailService } from './mail.service';

/**
 * Rôles valides pour la liste d'attente :
 * - FUTUR_COACH_POKER
 * - FUTUR_COACH_MENTAL
 * - FUTUR_ELEVE
 */
@Controller('mail')
export class MailController {
  constructor(
    private readonly waitlistMailService: WaitlistMailService,
    private readonly mailService: MailService
  ) {}

  @Post('test')
  async testEmail(
    @Body() body: { email: string; firstName: string; role: WaitlistRole }
  ) {
    try {
      const result = await this.waitlistMailService.sendWaitlistConfirmation(
        body.email,
        body.firstName,
        body.role
      );
      return {
        success: true,
        messageId: result.body?.messageId,
        message: 'Email envoyé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Get('test-configuration')
  async testConfiguration() {
    return this.mailService.testEmailConfiguration();
  }
} 