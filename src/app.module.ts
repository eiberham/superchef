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
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ChatModule } from './chat/chat.module';
import { RedisModule } from './redis/redis.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    StripeModule.forRootAsync(),
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    UserModule,
    RecipeModule,
    IngredientModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    AuthModule,
    RabbitMQModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
