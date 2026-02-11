import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { otelSDK } from './tracing';
import { Logger } from './logger';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.create(AppModule, { rawBody: true });
  const configService = app.get(ConfigService);
  const logLevel = configService.get<string>('LOG_LEVEL');
  const port = configService.get<number>('PORT') || 3000;

  const logger = new Logger({
    colors: true,
    json: true,
    prefix: 'Superchef',
    logLevels: logLevel
      ? JSON.parse(logLevel)
      : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useLogger(logger);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Super chef')
    .setDescription('Super chef docs')
    .setVersion('1.0')
    .addTag('superchef')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
}
bootstrap();
