import { Injectable, OnModuleInit } from '@nestjs/common'
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
    constructor(private readonly rabbitMQService: RabbitMQService){}
    async onModuleInit() {
        const channel = await this.rabbitMQService.getChannel()

        channel.assertQueue('task_queue', { durable: true })
        channel.consume('task_queue', (msg) => {
            if (msg !== null) {
                const content = msg.content.toString()
                console.log("Received:", content)
                
                channel.ack(msg)
            }
        })
    }
}