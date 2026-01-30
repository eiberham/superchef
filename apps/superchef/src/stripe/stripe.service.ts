import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private logger = new Logger(StripeService.name);

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2026-01-28.clover',
      appInfo: {
        // For sample support and debugging, not required for production:
        name: 'stripe-samples/accept-a-payment',
        url: 'https://github.com/stripe-samples',
        version: '0.0.2',
      },
      typescript: true,
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    try {
      const products = await this.stripe.products.list({
        limit: 10,
      });
      return products.data;
    } catch (error) {
      this.logger.error('Error fetching products from stripe', error);
      throw error;
    }
  }

  async getCustomers(): Promise<Stripe.Customer[]> {
    try {
      const customers = await this.stripe.customers.list({
        limit: 10,
      });
      return customers.data;
    } catch (error) {
      this.logger.error('Error fetching customers from stripe', error);
      throw error;
    }
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({
        email,
      });
      return customer;
    } catch (error) {
      this.logger.error('Error creating customer in stripe', error);
      throw error;
    }
  }

  async createSession(
    customerId: string,
    priceId: string,
  ): Promise<Stripe.Checkout.Session> {
    try {
      const appUrl = this.configService.get('APP_URL');
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/success`,
        cancel_url: `${appUrl}/cancel`,
      });
      return session;
    } catch (error) {
      this.logger.error('Error creating checkout session', error);
      throw error;
    }
  }

  async getLineItems(sessionId: string): Promise<Stripe.LineItem[]> {
    try {
      const lineItems = await this.stripe.checkout.sessions.listLineItems(
        sessionId,
        { limit: 100 },
      );
      return lineItems.data;
    } catch (error) {
      this.logger.error('Error fetching line items from stripe', error);
      throw error;
    }
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(
        subscriptionId,
        { expand: ['latest_invoice'] },
      );
      return subscription;
    } catch (error) {
      this.logger.error('Error fetching subscription from stripe', error);
      throw error;
    }
  }
}
