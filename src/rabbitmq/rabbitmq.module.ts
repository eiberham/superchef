import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { RabbitMQProducer } from './rabbitmq.producer';

@Module({
    providers: [
        RabbitMQService,
        RabbitMQConsumer,
        RabbitMQProducer,
    ],
    exports: [RabbitMQProducer],
})
export class RabbitMQModule {}