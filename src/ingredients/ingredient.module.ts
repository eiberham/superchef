import { Module } from '@nestjs/common';
import { IngredientController } from './controllers/ingredient.controller';
import { CreateIngredientUsecase } from './application/create-ingredient.usecase';
import { UpdateIngredientUsecase } from './application/update-ingredient.usecase';
import { ListIngredientsUsecase } from './application/list-ingredients.usecase';
import { GetIngredientUsecase } from './application/get-ingredient.usecase';
import { DeleteIngredientUsecase } from './application/delete-ingredient.usecase';
import { IngredientRepositoryImpl } from './infraestructure/prisma-ingredient.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [IngredientController],
    providers: [
        JwtService,
        CreateIngredientUsecase,
        UpdateIngredientUsecase,
        ListIngredientsUsecase,
        GetIngredientUsecase,
        DeleteIngredientUsecase,
        PrismaService,
        {
            provide: 'INGREDIENT_REPOSITORY',
            useClass: IngredientRepositoryImpl,
        }
    ]
})
export class IngredientModule {}