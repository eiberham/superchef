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

    async getChannel(): Promise<Channel> {
        if (!this.channel) {
            await this.onModuleInit()
        }
        return this.channel
    }
}