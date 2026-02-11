import { Module } from '@nestjs/common';
import { CheckoutController } from './controllers/checkout.controller';
import { StripeService } from 'backend/superchef/src/stripe/stripe.service';
import { CreateSessionUsecase } from './application/create-session.usecase';
import { CreateCustomerUsecase } from './application/create-customer.usecase';
import { GetUserByUsecase } from 'backend/superchef/src/users/application/get-user-by.usecase';
import { UpdateUserUsecase } from 'backend/superchef/src/users/application/update-user.usecase';
import { StripeModule } from 'backend/superchef/src/stripe/stripe.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'backend/superchef/src/users/user.module';

@Module({
  imports: [StripeModule.forRootAsync(), UserModule],
  controllers: [CheckoutController],
  providers: [
    StripeService,
    CreateSessionUsecase,
    CreateCustomerUsecase,
    GetUserByUsecase,
    UpdateUserUsecase,
    JwtService,
  ],
})
export class CheckoutModule {}
