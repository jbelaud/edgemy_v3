import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { WaitlistMailService } from './services/waitlist-mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService, WaitlistMailService],
  exports: [MailService, WaitlistMailService],
})
export class MailModule {} 