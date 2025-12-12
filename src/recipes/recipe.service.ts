import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepository } from './interfaces/recipe.interface';
import type { CreateRecipeDto } from './dto/create-recipe.dto';
import type { UpdateRecipeDto } from './dto/update-recipe.dto';
import type { RecipeResponseDto } from './dto/recipe-response.dto';

@Injectable()
export class RecipeService{
    constructor(
        @Inject('RECIPE_REPOSITORY') 
        private readonly recipeRepository: RecipeRepository
    ) {}

    async getRecipes(): Promise<RecipeResponseDto[]> {
        return this.recipeRepository.findAll()
    }

    async getRecipeById(id: number): Promise<RecipeResponseDto | null> {
        return this.recipeRepository.findById(id)
    }

    async createRecipe( recipeData: CreateRecipeDto ): Promise<RecipeResponseDto> {
        return this.recipeRepository.create(recipeData)
    }

    async updateRecipe(id: number, recipeData: UpdateRecipeDto): Promise<RecipeResponseDto> {
        return this.recipeRepository.update(id, recipeData)
    }

    async deleteRecipe(id: number): Promise<void> {
        return this.recipeRepository.delete(id)
    }
}