import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaitlistModule } from './modules/waitlist/waitlist.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [WaitlistModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
