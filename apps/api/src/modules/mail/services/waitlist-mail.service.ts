import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';
import { WaitlistRole } from '../../waitlist/enums/waitlist-role.enum';

@Injectable()
export class WaitlistMailService {
  constructor(private readonly mailService: MailService) {}

  async sendWaitlistConfirmation(email: string, firstName: string, role: WaitlistRole) {
    return this.mailService.sendWaitlistConfirmation(email, firstName, role);
  }
} 