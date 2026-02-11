import { Controller, Logger, UseFilters } from '@nestjs/common';
import { EventPattern, Ctx, RmqContext } from '@nestjs/microservices';
import type { ChannelModel, ConsumeMessage } from 'amqplib';
import { Email, UserRegisteredPayload } from '../domain/email.interface';
import { SendMailUsecase } from '../application/send-mail.usecase';
import { RmqErrorFilter } from '../infrastructure/filters/rmq.error.filter';

@UseFilters(RmqErrorFilter)
@Controller()
export class RabbitmqController {
  private readonly logger = new Logger(RabbitmqController.name);

  constructor(private readonly email: SendMailUsecase) {}

  @EventPattern('user_registered')
  async handleSendEmail(@Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef() as ChannelModel;
    const message = context.getMessage() as ConsumeMessage;

    let payload: UserRegisteredPayload;
    let data : Email
    try {
      payload = JSON.parse(message.content.toString()) as UserRegisteredPayload;
      data = JSON.parse(String(payload.data)) as Email
    } catch (err) {
      this.logger.error('Failed to parse message content', err as Error);
      channel.nack(message);
      return;
    }

    await this.email.send(data);

    channel.ack(message);
    this.logger.log('Email sent successfully');
  }
}
