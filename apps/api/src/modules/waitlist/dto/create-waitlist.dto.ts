// apps/api/src/modules/waitlist/dto/create-waitlist.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { WaitlistRole } from '../enums/waitlist-role.enum';

export class CreateWaitlistDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsEnum(WaitlistRole)
  @IsNotEmpty()
  role: WaitlistRole;
}