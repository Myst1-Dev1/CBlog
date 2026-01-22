import { IsEmail, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Min(6, { message: 'A senha precisa ter no minimo 6 caracteres' })
  password: string;

  @IsString()
  @Min(3, { message: 'O nome de usuario precisa ter no minimo 3 caracteres' })
  username: string;

  @IsOptional()
  avatarUrl?: string;
}
