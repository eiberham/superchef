import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from '../stripe.service';
import { Stripe } from 'stripe';
import { GetSubscriptionByUsecase } from 'backend/superchef/src/subscriptions/application/get-subscription-by.usecase';
import { UpdateSubscriptionUsecase } from 'backend/superchef/src/subscriptions/application/update-subscription.usecase';
import { SubscriptionNotFoundException } from 'backend/superchef/src/common/exceptions/subscription-not-found.exception';
import { UpdateUserUsecase } from 'backend/superchef/src/users/application/update-user.usecase';
import { GetUserByUsecase } from 'backend/superchef/src/users/application/get-user-by.usecase';
import { GetPlanByUsecase } from 'backend/superchef/src/plan/application/get-plan-by.usecase';

@Injectable()
export class CheckoutSessionCompletedUsecase {
  Logger = new Logger(CheckoutSessionCompletedUsecase.name);

  constructor(
    private readonly stripe: StripeService,
    private readonly getSubscriptionByUsecase: GetSubscriptionByUsecase,
    private readonly updateSubscriptionUsecase: UpdateSubscriptionUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly getUserByUsecase: GetUserByUsecase,
    private readonly getPlanByUsecase: GetPlanByUsecase,
  ) {}

  async handle(session: Stripe.Checkout.Session): Promise<void> {
    const {
      id: sessionId,
      customer: stripeCustomerId,
      subscription: stripeSubscriptionId,
    } = session;

    const stripeSubscription = await this.stripe.getSubscription(
      stripeSubscriptionId as string,
    );

    const user = await this.getUserByUsecase.findBy({
      stripeCustomerId: stripeCustomerId as string,
    });

    if (!user) {
      this.Logger.warn(
        `User with Stripe Customer ID ${stripeCustomerId} not found.`,
      );
      return;
    }

    const userId = user.id;

    const items = await this.stripe.getLineItems(sessionId);
    const price = items?.[0].price;

    let interval: string;

    if (price?.type === 'recurring' && price.recurring) {
      interval = price.recurring.interval; // 'month', 'year'

      const plan = await this.getPlanByUsecase.findBy({
        stripePriceId: price.id,
      });

      const subscription =
        await this.getSubscriptionByUsecase.getSubscriptionBy({
          userId,
        });

      if (!subscription) {
        throw new SubscriptionNotFoundException();
      }

      let currentPeriodEnd: Date;
      const stripePeriodEnd = stripeSubscription.current_period_end;

      if (stripePeriodEnd) {
        currentPeriodEnd = new Date(stripePeriodEnd * 1000);
      } else if (stripeSubscription.latest_invoice) {
        const invoice = stripeSubscription.latest_invoice as Stripe.Invoice;
        const periodEnd = invoice.lines.data[0].period.end;
        currentPeriodEnd = new Date(periodEnd * 1000);
      } else if (stripeSubscription.billing_cycle_anchor) {
        const anchorDate = new Date(
          stripeSubscription.billing_cycle_anchor * 1000,
        );
        if (interval === 'month') {
          anchorDate.setMonth(anchorDate.getMonth() + 1);
        } else {
          anchorDate.setFullYear(anchorDate.getFullYear() + 1);
        }
        currentPeriodEnd = anchorDate;
      } else {
        currentPeriodEnd = new Date(
          Date.now() + (interval === 'month' ? 30 : 365) * 24 * 60 * 60 * 1000,
        );
      }

      const updateTo = {
        ...subscription,
        stripeSubscriptionId: stripeSubscriptionId as string,
        currentPeriodEnd,
        status: 'active',
        interval: interval,
        planId: plan?.id ? plan.id : subscription.planId,
      };

      try {
        await Promise.all([
          this.updateUserUsecase.updateUser(userId, {
            stripeCustomerId: stripeCustomerId as string,
          }),
          this.updateSubscriptionUsecase.update(subscription.id, updateTo),
        ]);
      } catch (error) {
        this.Logger.error(
          'Error updating subscription after checkout session completed:',
          error,
        );
      }
    }
  }
}
