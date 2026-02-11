import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GetTopRecipes {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka
    ) {}

    async handle() {
        return await lastValueFrom(
            this.kafka.send('get.top.recipes', { timestamp: Date.now() })
        );
    }
}