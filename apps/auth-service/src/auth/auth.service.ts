/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  ping() {
    return {
      ok: true,
      service: 'auth',
      now: new Date().toISOString(),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email, password, username, avatarUrl } = createUserDto;

    const userExists = await this.UsersService.findByEmail(email);

    if (!email || !password || !username) {
      throw new UnauthorizedException('Preencha todos os campos');
    }

    if (userExists) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.UsersService.create({
      email,
      password: hashedPassword,
      username,
      avatarUrl,
    });

    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      avatarUrl: newUser.avatarUrl,
    };
  }

  async signIn(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user: any = await this.UsersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado !');
    }

    const isPassswordValid = await bcrypt.compare(password, user.password);

    if (!isPassswordValid) {
      throw new UnauthorizedException('Invalid credentials! Please try again.');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    const { password: _, ...result } = user;

    return { ...result, token };
  }

  async findAll(): Promise<User[]> {
    return await this.UsersService.findAll();
  }

  async findOneById(id: number): Promise<User> {
    const singleUser = await this.UsersService.findById(id);

    if (!singleUser) {
      throw new NotFoundException(`O id ${singleUser} não foi encontrado`);
    }

    return singleUser;
  }
}
