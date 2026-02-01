import { Module } from '@nestjs/common';
import { PrismaOutboxRepository } from './infrastructure/outbox.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OutboxProcessor } from './infrastructure/outbox.processor';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
          queue: 'rabbitmq',
          queueOptions: {
            durable: false,
            arguments: {
              'prefetch-count': 1,
              'x-message-ttl': 60000,
              'x-max-priority': 10,
              'x-dead-letter-exchange': 'dead_letter_exchange',
              'x-dead-letter-routing-key': 'dead_letter',
            },
          },
          noAck: true,
        },
      },
    ]),
  ],
  providers: [PrismaOutboxRepository, PrismaService, OutboxProcessor],
  exports: [PrismaOutboxRepository],
})
export class OutboxModule {}