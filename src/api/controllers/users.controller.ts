import { Controller, Get } from '@nestjs/common';
import { UserService } from '@/domains/users/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
