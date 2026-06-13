import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 API running at http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
});
