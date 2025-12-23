import { Injectable, OnModuleInit } from '@nestjs/common';
import amqp, { Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private connection: Connection
    private channel: Channel
    
    async onModuleInit() {
        this.connection = await amqp.connect('amqp://localhost')
        this.channel = await this.connection.createChannel()
    }

    getChannel(): Channel {
        return this.channel
    }
}