import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { WaitlistRole } from '../waitlist/enums/waitlist-role.enum';

// Chargement des variables d'environnement de test
dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWaitlistConfirmation', () => {
    it('should throw error if BREVO_API_KEY is not set', async () => {
      // Sauvegarde de la variable d'environnement
      const originalApiKey = process.env.BREVO_API_KEY;
      delete process.env.BREVO_API_KEY;

      try {
        await Test.createTestingModule({
          providers: [MailService],
        }).compile();
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toContain('Configuration Brevo manquante');
      } finally {
        // Restauration de la variable d'environnement
        process.env.BREVO_API_KEY = originalApiKey;
      }
    });

    it('should send confirmation email with correct parameters', async () => {
      const email = 'test@example.com';
      const firstName = 'John';
      const role = WaitlistRole.FUTUR_COACH_POKER;

      const result = await service.sendWaitlistConfirmation(email, firstName, role);

      expect(result).toBeDefined();
      expect(result.body?.messageId).toBeDefined();
    });

    it('should throw error for invalid role', async () => {
      const email = 'test@example.com';
      const firstName = 'John';
      const invalidRole = 'INVALID_ROLE' as WaitlistRole;

      await expect(
        service.sendWaitlistConfirmation(email, firstName, invalidRole)
      ).rejects.toThrow('Rôle invalide');
    });
  });
}); 