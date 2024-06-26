import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
