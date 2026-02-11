import { Injectable, Inject } from '@nestjs/common';
import type { SubscriptionRepository } from '../domain/subscription.interface';
import { Subscription } from '../domain/subscription.interface';

@Injectable()
export class UpdateSubscriptionUsecase {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private readonly subscription: SubscriptionRepository,
  ) {}
  async update(id: string, subscription: Subscription): Promise<Subscription> {
    return this.subscription.update(id, subscription);
  }
}
