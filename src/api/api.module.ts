import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from '@/config/app.config';
import { appConfigSchema } from '@/config/config.types';
import { typeOrmConfig } from '@/config/database.config';
import { authConfig } from '@/config/auth.config';
import { TypedConfigService } from '@/config/typed-config.service';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from '@/shared/guard/auth.guard';

import { ApiController } from './api.controller';
import { AuthModule } from '@/domains/auth/auth.module';
import { UserModule } from '@/domains/users/user.module';
import { TaskModule } from '@/domains/tasks/task.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get('database'),
        autoLoadEntities: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeOrmConfig, authConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    AuthModule,
    UserModule,
    TaskModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ApiController],
})
export class ApiModule {}
