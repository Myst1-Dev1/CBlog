import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUserDto';
import { LoginDto } from './dto/loginDto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @MessagePattern('auth.registerNewUser')
  async register(@Payload() registerDto: CreateUserDto): Promise<any> {
    try {
      return await this.authService.signUp(registerDto);
    } catch (error) {
      console.error('❌ Error in auth.registerNewUser:', error);
      throw error;
    }
  }

  @MessagePattern('auth.login')
  @Post('login')
  async login(@Body() login: LoginDto): Promise<any> {
    try {
      return this.authService.signIn(login);
    } catch (error) {
      console.error('❌ Error in auth.login:', error);
      throw error;
    }
  }

  @MessagePattern('auth.getUsers')
  @Get('users')
  async getUsers() {
    try {
      return this.authService.findAll();
    } catch (error) {
      console.error('❌ Error in auth.getUsers:', error);
      throw error;
    }
  }

  @MessagePattern('auth.getUserById')
  @Get('user/:id')
  // @UseGuards(JwtAuthGuard)
  async getUserById(@Payload() id: number) {
    try {
      return this.authService.findOneById(Number(id));
    } catch (error) {
      console.error('❌ Error in auth.getUserById:', error);
      throw error;
    }
  }

  @MessagePattern('service.ping')
  ping() {
    return this.authService.ping();
  }
}
