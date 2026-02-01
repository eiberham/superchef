import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { RecipeModule } from './recipes/recipe.module';
import { IngredientModule } from './ingredients/ingredient.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { StripeModule } from './stripe/stripe.module';
import { PlanModule } from './plan/plan.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CacheModule } from '@nestjs/cache-manager';
import { KafkaModule } from './kafka.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HealthModule } from './health/health.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    KafkaModule,
    CacheModule.register({ isGlobal: true }),
    StripeModule.forRootAsync(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname + '/../../../apps/superchef/.env'],
    }),
    UserModule,
    RecipeModule,
    IngredientModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ]
    }),
    AuthModule,
    ChatModule,
    PlanModule,
    CheckoutModule,
    AnalyticsModule,
    HealthModule,
    OutboxModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
