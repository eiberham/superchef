import { Injectable } from '@nestjs/common'
import { RabbitMQService } from './rabbitmq.service'

@Injectable()
export class RabbitMQProducer {
    constructor(private readonly rabbitMQService: RabbitMQService){}

    async sendToQueue(queue: string, payload: any): Promise<void> {
        const channel = await this.rabbitMQService.getChannel()

        await channel.assertQueue(queue, { durable: true })

        channel.sendToQueue(
            queue, 
            Buffer.from(JSON.stringify(payload)), 
            { persistent: true }
        )
    }
}