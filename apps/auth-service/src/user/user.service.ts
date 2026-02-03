/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  findAll() {
    return this.repo.find({
      select: ['id', 'avatarUrl', 'email', 'username'],
    });
  }

  create(data: Partial<User>) {
    return this.repo.save(this.repo.create(data));
  }
}
