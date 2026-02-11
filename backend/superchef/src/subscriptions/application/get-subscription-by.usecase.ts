import { Injectable, Inject } from '@nestjs/common';
import type { SubscriptionRepository } from '../domain/subscription.interface';
import { Subscription } from '../domain/subscription.interface';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class GetSubscriptionByUsecase {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private readonly subscription: SubscriptionRepository,
  ) {}
  async getSubscriptionBy<T extends Prisma.SubscriptionWhereInput>(
    query: T,
  ): Promise<Subscription | null> {
    return this.subscription.findBy(query);
  }
}
