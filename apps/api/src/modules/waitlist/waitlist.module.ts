// apps/api/src/modules/waitlist/waitlist.module.ts
import { Module } from '@nestjs/common';
import { WaitlistController } from './controllers/waitlist.controller';
import { WaitlistService } from './services/waitlist.service';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService, PrismaService, MailService],
})
export class WaitlistModule {}