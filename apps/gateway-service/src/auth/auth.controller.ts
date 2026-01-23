/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

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
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
  ) {}

  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Only images allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  @Post('registerNewUser')
  async registerNewUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: {
      email: string;
      password: string;
      username: string;
    },
  ) {
    let avatarUrl = '';

    if (file) {
      const uploadResult = await firstValueFrom(
      this.mediaClient.send('media.uploadImage', {
        base64: (file.buffer as Buffer).toString('base64'), // Converta aqui
        mimeType: file.mimetype,
        fileName: file.originalname,
      }),
    );

      avatarUrl = uploadResult.url;
    }

    return firstValueFrom(
      this.authClient.send('auth.registerNewUser', {
        ...body,
        avatarUrl,
      }),
    );
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

    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    async getUserById(@Param('id') id: string) {
        return await firstValueFrom(
            this.authClient.send('auth.getUserById', Number(id))
         );
    }

}
