import { Module } from '@nestjs/common';
import { IngredientController } from './controllers/ingredient.controller';
import { CreateIngredientUsecase } from './application/create-ingredient.usecase';
import { UpdateIngredientUsecase } from './application/update-ingredient.usecase';
import { ListIngredientsUsecase } from './application/list-ingredients.usecase';
import { GetIngredientByUsecase } from './application/get-ingredient-by.usecase';
import { DeleteIngredientUsecase } from './application/delete-ingredient.usecase';
import { IngredientRepositoryImpl } from './infrastructure/prisma-ingredient.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [IngredientController],
  providers: [
    JwtService,
    CreateIngredientUsecase,
    UpdateIngredientUsecase,
    ListIngredientsUsecase,
    GetIngredientByUsecase,
    DeleteIngredientUsecase,
    PrismaService,
    {
      provide: 'INGREDIENT_REPOSITORY',
      useClass: IngredientRepositoryImpl,
    },
  ],
})
export class IngredientModule {}
