import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InvoicePaidUsecase {
  Logger = new Logger(InvoicePaidUsecase.name);

  async handle(invoice: any): Promise<void> {
    // TODO:
    // Update current_period_end for the subscription
    // Send invoice paid notification to the user
    // Log the event
    // Turn the subscription status to active if it was past_due
  }
}
