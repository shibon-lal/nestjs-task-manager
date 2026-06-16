import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UsersController } from '@/api/controllers/users.controller';
import { PasswordService } from '@/shared/services/password/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository, PasswordService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
