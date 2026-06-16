import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@/shared/decorators/public.decorator';
import { AuthService } from '@/domains/auth/auth.service';

import { LoginDto } from '@/domains/auth/dto/login.dto';
import { CreateUserDto } from '@/domains/users/dto/create-user.dto';
import { userResponseDto } from '@/domains/users/dto/user-response.dto';
import { LoginResponseDto } from '@/domains/auth/dto/login-response.dto';
import { ApiResponse } from '@/shared/interceptors/response.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<userResponseDto>> {
    const user = await this.authService.register(createUserDto);
    return {
      success: true,
      message: 'Register Successful, Please Login',
      data: {
        name: user.name,
        email: user.email,
      },
    };
  }

  @Post('login')
  @Public()
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ApiResponse<LoginResponseDto>> {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return {
      success: true,
      message: 'Login successfully',
      data: {
        accessToken,
      },
    };
  }
}
