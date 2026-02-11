import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionRepositoryImpl } from './infrastructure/prisma-subscription.repository';
import { GetSubscriptionByUsecase } from './application/get-subscription-by.usecase';
import { UpdateSubscriptionUsecase } from './application/update-subscription.usecase';

@Module({
  providers: [
    {
      provide: 'SUBSCRIPTION_REPOSITORY',
      useClass: SubscriptionRepositoryImpl,
    },
    GetSubscriptionByUsecase,
    UpdateSubscriptionUsecase,
    PrismaService,
  ],
  exports: ['SUBSCRIPTION_REPOSITORY'],
})
export class SubscriptionModule {}
