import { Module } from '@nestjs/common';
import { RecipeController } from './controllers/recipe.controller';
import { CreateRecipeUsecase } from './application/create-recipe.usecase';
import { ListRecipesUsecase } from './application/list-recipes.usecase';
import { DeleteRecipeUsecase } from './application/delete-recipe.usecase';
import { GetRecipeUsecase } from './application/get-recipe.usecase';
import { GetRecipeByNameUsecase } from './application/get-recipe-by-name.usecase';
import { UpdateRecipeUsecase } from './application/update-recipe.usecase';
import { RecipeRepositoryImpl } from './infraestructure/prisma-recipe.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
    controllers: [RecipeController],
    providers: [
        JwtService,
        CreateRecipeUsecase,
        UpdateRecipeUsecase,
        GetRecipeUsecase,
        GetRecipeByNameUsecase,
        DeleteRecipeUsecase,
        ListRecipesUsecase,
        PrismaService,
        {
            provide: 'RECIPE_REPOSITORY',
            useClass: RecipeRepositoryImpl,
        }
    ]
})
export class RecipeModule {}