import { HttpException, HttpStatus } from '@nestjs/common';

export class SubscriptionNotFoundException extends HttpException {
  constructor() {
    super('Subscription not found', HttpStatus.NOT_FOUND);
  }
}
