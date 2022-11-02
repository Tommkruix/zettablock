import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors({
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'v1',
  });
  await app.listen(3000);
}
bootstrap();
