import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe : Stripe
    private logger = new Logger(StripeService.name);

    constructor(
        @Inject('STRIPE_API_KEY') private readonly apiKey: string
    ) {

        this.stripe = new Stripe(this.apiKey, {
            apiVersion: "2025-12-15.clover",
            appInfo: { // For sample support and debugging, not required for production:
                name: "stripe-samples/accept-a-payment",
                url: "https://github.com/stripe-samples",
                version: "0.0.2",
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
    
}