import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './users/user.module';
import { RecipeModule } from './recipes/recipe.module';
import { IngredientModule } from './ingredients/ingredient.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
