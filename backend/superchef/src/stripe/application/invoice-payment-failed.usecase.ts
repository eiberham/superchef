import { Injectable, Inject, Logger } from '@nestjs/common';
import { GetSubscriptionByUsecase } from 'backend/superchef/src/subscriptions/application/get-subscription-by.usecase';
import { UpdateSubscriptionUsecase } from 'backend/superchef/src/subscriptions/application/update-subscription.usecase';
import { GetUserByUsecase } from 'backend/superchef/src/users/application/get-user-by.usecase';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InvoicePaymentFailedUsecase {
  Logger = new Logger(InvoicePaymentFailedUsecase.name);

  constructor(
    private readonly getSubscriptionByUsecase: GetSubscriptionByUsecase,
    private readonly updateSubscriptionUsecase: UpdateSubscriptionUsecase,
    private readonly getUserByUsecase: GetUserByUsecase,
    @Inject('EMAIL_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async handle(invoice: any): Promise<void> {
    const stripeSubscriptionId = invoice.subscription as string;
    const stripeCustomerId = invoice.customer as string;

    const reason = invoice.last_finalization_error?.message || 'Unknown error';

    try {
      const subscription =
        await this.getSubscriptionByUsecase.getSubscriptionBy({
          stripeSubscriptionId,
        });
      if (subscription) {
        // Let the system know about the failed payment
        await this.updateSubscriptionUsecase.update(subscription.id, {
          ...subscription,
          status: 'past_due',
        });

        // Notify the user about the payment issue
        const user = await this.getUserByUsecase.findBy({ stripeCustomerId });

        if (user) {
          this.Logger.warn(`Payment failed for user ${user.id}: ${reason}`);
          this.client.emit('send_email', {
            to: user.email,
            subject: 'Payment Failure Notification',
            body: `Dear ${user.name},\n\n
                        We encountered an issue processing your recent payment: ${reason}.\n
                        Please update your payment information to continue enjoying our services.\n\n
                        Best regards,\nSuperchef Team`,
          });
        }
      }
    } catch (error) {
      this.Logger.error('Error handling payment failure:', error);
    }
  }
}
