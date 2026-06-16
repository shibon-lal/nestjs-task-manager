import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { PasswordService } from '@/shared/services/password/password.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const hashedPassword = await this.passwordService.hash(
      createUserDto.password,
    );
    const user = await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }
  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findByEmail(email);
  }

  getUsers() {
    return this.userRepo.findAll();
  }
}
