import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './controller/stripe.controller';
import { CheckoutSessionCompletedUsecase } from './application/checkout-session-completed.usecase';
import { InvoicePaymentFailedUsecase } from './application/invoice-payment-failed.usecase';
import { InvoicePaidUsecase } from './application/invoice-paid.usecase';
import { CustomerSubscriptionDeletedUsecase } from './application/customer-subscription-deleted.usecase';
import { GetSubscriptionByUsecase } from 'backend/superchef/src/subscriptions/application/get-subscription-by.usecase';
import { UpdateSubscriptionUsecase } from 'backend/superchef/src/subscriptions/application/update-subscription.usecase';
import { UpdateUserUsecase } from 'backend/superchef/src/users/application/update-user.usecase';
import { GetUserByUsecase } from 'backend/superchef/src/users/application/get-user-by.usecase';
import { SubscriptionModule } from 'backend/superchef/src/subscriptions/subscription.module';
import { UserModule } from 'backend/superchef/src/users/user.module';
import { GetPlanByUsecase } from 'backend/superchef/src/plan/application/get-plan-by.usecase';
import { PlanModule } from 'backend/superchef/src/plan/plan.module';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [
        ClientsModule.register([
          {
            name: 'EMAIL_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://localhost:5672'],
              queue: 'rabbitmq',
              noAssert: true,
            },
          },
        ]),
        SubscriptionModule,
        UserModule,
        PlanModule,
      ],
      controllers: [StripeController],
      providers: [
        GetSubscriptionByUsecase,
        GetUserByUsecase,
        UpdateSubscriptionUsecase,
        UpdateUserUsecase,
        CheckoutSessionCompletedUsecase,
        InvoicePaymentFailedUsecase,
        InvoicePaidUsecase,
        CustomerSubscriptionDeletedUsecase,
        GetPlanByUsecase,
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get<string>('STRIPE_API_KEY'),
          inject: [ConfigService],
        },
      ],
      exports: [
        StripeService,
        'STRIPE_API_KEY',
        CheckoutSessionCompletedUsecase,
        InvoicePaymentFailedUsecase,
      ],
    };
  }
}
