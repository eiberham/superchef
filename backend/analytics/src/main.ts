import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AnalyticsModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'analytics-consumer',
      },
    },
  });
  
  await app.listen();
}
bootstrap();
