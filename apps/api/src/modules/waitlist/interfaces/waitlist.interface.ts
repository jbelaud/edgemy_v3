import { WaitlistRole } from '../enums/waitlist-role.enum';

export interface Waitlist {
  id: string;
  email: string;
  role: WaitlistRole;
  lastName: string;
  firstName: string;
  createdAt: Date;
  updatedAt: Date;
} 