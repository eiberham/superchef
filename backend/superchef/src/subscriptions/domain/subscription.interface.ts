import { Prisma } from 'generated/prisma/edge';

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  stripeSubscriptionId: string | null;
  status: string | null;
  currentPeriodEnd: Date | null;
  createdAt: Date;
  canceledAt: Date | null;
  interval: string | null;
}

export interface SubscriptionRepository {
  findBy<T extends Prisma.SubscriptionWhereInput>(
    query: T,
  ): Promise<Subscription | null>;
  update(
    id: string,
    subscription: Partial<Subscription>,
  ): Promise<Subscription>;
  delete(id: string): Promise<void>;
}
