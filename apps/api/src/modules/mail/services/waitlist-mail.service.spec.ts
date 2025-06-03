import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistMailService } from './waitlist-mail.service';
import { MailService } from '../mail.service';
import { WaitlistRole } from '../../waitlist/enums/waitlist-role.enum';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Chargement des variables d'environnement de test
dotenv.config({ path: path.resolve(__dirname, '../../../../.env.test') });

describe('WaitlistMailService', () => {
  let service: WaitlistMailService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitlistMailService, MailService],
    }).compile();

    service = module.get<WaitlistMailService>(WaitlistMailService);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWaitlistConfirmation', () => {
    it('should send a real confirmation email', async () => {
      // Remplacez ces valeurs par une adresse email de test valide
      const testEmail = 'test@example.com';
      const testFirstName = 'Test';
      const testRole = WaitlistRole.FUTUR_COACH_POKER;

      try {
        const result = await service.sendWaitlistConfirmation(
          testEmail,
          testFirstName,
          testRole
        );

        console.log('Résultat de l\'envoi:', result);
        expect(result).toBeDefined();
        expect(result.body?.messageId).toBeDefined();
      } catch (error) {
        console.error('Erreur lors du test:', error);
        throw error;
      }
    });
  });
}); 