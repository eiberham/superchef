import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError, of } from 'rxjs';
import { PrismaOutboxRepository } from './outbox.service';
import { OutboxStatus } from '../domain/outbox.interface';

@Injectable()
export class OutboxProcessor implements OnModuleInit {
    private isProcessing = false;
    private readonly logger = new Logger(OutboxProcessor.name);

    constructor(
        private readonly outbox: PrismaOutboxRepository,
        @Inject('EMAIL_SERVICE') private client: ClientProxy,
    ) {}

    async onModuleInit() {
        await this.client.connect();
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handle() {
        if (this.isProcessing) return // Prevent overlapping if the previous one hasn't finished

        this.isProcessing = true

        try {
            this.logger.debug('Processing outbox events...');
            const messages = await this.outbox.findManyBy({ status: OutboxStatus.PENDING });
            if (!messages?.length) {
                this.logger.debug('No pending outbox events found.');
                return;
            }
            for (const message of messages) {
                try {
                    const {topic, payload } = message

                    // Use firstValueFrom to wait for the emit to complete
                    // emit() completes when the message is sent to the broker
                    await firstValueFrom(
                        this.client.emit(topic, payload).pipe(
                            timeout(5000),
                            catchError((err) => {
                                this.logger.error(`Emit failed for ${message.id}:`, err);
                                throw err;
                            })
                        )
                    );

                    this.logger.log(`Successfully emitted event ${message.id} to topic: ${topic}`);
                    await this.outbox.update(message.id, { status: OutboxStatus.PROCESSED })
                } catch (error) {
                    const errorMessage = error?.message || String(error) || 'Unknown error';
                    this.logger.error(`Failed to process outbox event ${message.id}:`, JSON.stringify(errorMessage));
                    await this.outbox.update(message.id, {
                        error: errorMessage,
                        attempts: message.attempts + 1,
                        status: message.attempts >= 3 ? OutboxStatus.FAILED : OutboxStatus.PENDING
                    })
                }
            }
        } finally {
            this.isProcessing = false
        }
    }
}