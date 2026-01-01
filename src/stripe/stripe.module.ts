import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({})
export class StripeModule{
    static forRootAsync(): DynamicModule {
        return {
            module: StripeModule,
            imports: [],
            controllers: [StripeController],
            providers: [
                StripeService,
                {
                    provide: 'STRIPE_API_KEY',
                    useFactory: async (configService: ConfigService) => configService.get<string>('STRIPE_API_KEY'),
                    inject: [ConfigService],
                }
            ],
            exports: [StripeService],
        };
    }
}