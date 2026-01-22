/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, Min } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Min(6, { message: 'A senha precisa ter no minimo 6 caracteres' })
  password: string;
}
