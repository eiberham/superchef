import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomerSubscriptionDeletedUsecase {
  Logger = new Logger(CustomerSubscriptionDeletedUsecase.name);

  async handle(event: any): Promise<void> {
    // TODO:
    // Update subscription status to canceled in the database
    // Notify the user about the cancellation
    // Log the event
    // Change back the user's plan to free if applicable
  }
}
