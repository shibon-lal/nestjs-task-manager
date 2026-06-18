import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

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
