import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepository } from '../domain/recipe.interface';
import type { RecipeResponseDto } from '../controllers/dto/recipe-response.dto';

@Injectable()
export class GetRecipeByNameUsecase{
    constructor(
        @Inject('RECIPE_REPOSITORY') 
        private readonly recipeRepository: RecipeRepository
    ) {}

    async getRecipeByName(name: string): Promise<RecipeResponseDto | null> {
        return this.recipeRepository.findByName(name)
    }
}