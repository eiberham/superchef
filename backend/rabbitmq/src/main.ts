import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { RabbitmqModule } from './rabbitmq.module';
import { ConfigService } from '@nestjs/config';
import { otelSDK } from 'backend/superchef/src/tracing';
import { Logger } from 'backend/superchef/src/logger';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitmqModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
        queue: 'rabbitmq',
        queueOptions: {
          durable: false,
          arguments: {
            'prefetch-count': 1, // Process one message at a time (Backpressure)
            'x-message-ttl': 60000,
            'x-max-priority': 10,
            'x-dead-letter-exchange': 'dead_letter_exchange',
            'x-dead-letter-routing-key': 'dead_letter',
          },
        },
        noAck: false,
      },
    },
  );

  const configService = app.get(ConfigService);
  const logLevel = configService.get<string>('LOG_LEVEL');

  const logger = new Logger({
    colors: true,
    json: true,
    prefix: 'RabbitMQ',
    logLevels: logLevel
      ? JSON.parse(logLevel)
      : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useLogger(logger);

  await app.listen();
}

/**
 * Important:
 *
 * You should either manually or via script create the DLX and DLQ in RabbitMQ management console or via code.
 *
 * Example setup:
 *
 * 1. Create a Dead Letter Exchange (DLX) named 'dead_letter_exchange' of type 'direct'.
 * 2. Create a Dead Letter Queue (DLQ) named 'dead_letter_queue' of type 'classic'.
 * 3. Bind the DLQ to the DLX with the routing key 'dead_letter'.
 * 4. Bind the DLQ to the DLX with the routing key 'dead_letter_final' for final dead letters.
 *
 * This setup ensures that messages that are negatively acknowledged (nack) without requeueing
 * are routed to the dead letter queue for further inspection or processing.
 */

bootstrap();
