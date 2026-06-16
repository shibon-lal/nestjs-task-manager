import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { UserModule } from '@domains/users/user.module';
import { AuthController } from '@/api/controllers/auth.controller';
import { PasswordService } from '@/shared/services/password/password.service';
import { AuthService } from './auth.service';
import { AuthConfig } from '@/config/auth.config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const auth = configService.getOrThrow<AuthConfig>('auth');
        return {
          secret: auth.jwt.secret,
          signOptions: {
            expiresIn: auth.jwt.expiresIn as StringValue,
          },
        };
      },
    }),
  ],
  providers: [AuthService, PasswordService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
