import { Injectable } from '@nestjs/common';
import { StripeService } from 'backend/superchef/src/stripe/stripe.service';
import { Stripe } from 'stripe';

@Injectable()
export class CreateCustomerUsecase {
  constructor(private readonly stripeService: StripeService) {}

  async create(email: string): Promise<Stripe.Customer> {
    return this.stripeService.createCustomer(email);
  }
}
