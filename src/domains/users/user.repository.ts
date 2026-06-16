import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    console.log(email);
    return this.repo.findOne({ where: { email } });
  }
}
