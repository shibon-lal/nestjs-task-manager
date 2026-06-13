import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from '@/config/app.config';
import { appConfigSchema } from '@/config/config.types';
import { typeOrmConfig } from '@/config/database.config';
import { authConfig } from '@/config/auth.config';
import { TypedConfigService } from '@/config/typed-config.service';

import { ApiController } from './api.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get('database'),
        entities: [],
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
  ],
  controllers: [ApiController],
})
export class ApiModule {}
