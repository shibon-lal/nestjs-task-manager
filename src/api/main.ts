import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { ApiModule } from './api.module';
import { ResponseInterceptor } from '@/shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@/shared/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatted: Record<string, string> = {};

        errors.forEach((err) => {
          if (!err.constraints) return;

          const field = err.property;

          const firstConstraintKey = Object.keys(err.constraints)[0];
          const message = err.constraints[firstConstraintKey];
          console.log(message);

          if (message) {
            formatted[field] = message;
          }
        });
        return new BadRequestException({
          success: false,
          message: 'Validation failed',
          errors: formatted,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 API running at http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
});
