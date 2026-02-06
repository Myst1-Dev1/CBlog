import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

const mockUserService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
})
    it('Should return ping info', () => {
        const result = service.ping();

        expect(result.ok).toBe(true);
        expect(result.service).toBe('auth');
    });

    it('should create a new user', async () => {
        mockUserService.findByEmail.mockResolvedValue(null);
        mockUserService.create.mockResolvedValue({
            id: 1,
            email: 'test@mail.com',
            username: 'test',
            avatarUrl: null,
        });

        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

        const result = await service.signUp({
            email: 'test@mail.com',
            password: '123456',
            username: 'test',
            avatarUrl: '',
        });

        expect(result.email).toBe('test@mail.com');
        expect(mockUserService.create).toHaveBeenCalled();
    });
});
