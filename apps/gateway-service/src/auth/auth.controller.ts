/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard';

type User = {
    id: string;
    email: string;
    password: string;
    username: string;
    avatarUrl?:string;
}

type Login = Pick<User, 'email' | 'password'>;

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
  ) {}

  @Post('registerNewUser')
  async registerNewUser(
    @Body()
    body: {
      email: string;
      password: string;
      username: string;
    },
  ) {
    const payload = {
      email: body.email,
      password: body.password,
      username: body.username,
      avatarUrl: '',
    };

    if(!payload) {
        throw new UnauthorizedException('Preencha todos os campos !');
    }

    let result: User;

    try {
      result = await firstValueFrom(this.authClient.send('auth.registerNewUser', payload));
    } catch (error: any) {
      throw new InternalServerErrorException({
            message: 'Auth service error',
            cause: error?.message ?? error,
      });
    }

    return result;
  }

  @Post('login')
  async login(@Body() body: {
    email: string;
    password: string;
  }) {
    const payload = { email: body.email, password: body.password };

    if(!payload) {
        throw new UnauthorizedException('Preencha todos os campos !');
    }

    let result: Login;

    try {
      result = await firstValueFrom(this.authClient.send('auth.login', payload));
    } catch (error: any) {
      throw new InternalServerErrorException({
            message: 'Auth service error',
            cause: error?.message ?? error,
       });
    }

    return result;
  }

  @Get('users')
    async getUsers() {
        return await firstValueFrom(
            this.authClient.send('auth.getUsers', {})
        );
    }

    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    async getUserById(@Param('id') id: string) {
        return await firstValueFrom(
            this.authClient.send('auth.getUserById', Number(id))
         );
    }

}
