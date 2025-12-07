import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { IngredientRepositoryImpl } from './repositories/ingredient.repository.impl';
import { PrismaService } from '../prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    controllers: [IngredientController],
    providers: [
        IngredientService,
        PrismaService,
        {
            provide: 'INGREDIENT_REPOSITORY',
            useClass: IngredientRepositoryImpl,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class IngredientModule {}