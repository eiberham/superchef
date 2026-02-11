import { Injectable, Inject } from '@nestjs/common';
import type {
  RecipeRepository,
  Recipe,
  CreateRecipeData,
} from '../domain/recipe.interface';

@Injectable()
export class CreateRecipeUsecase {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipe: RecipeRepository,
  ) {}

  async createRecipe(data: CreateRecipeData): Promise<Recipe> {
    return this.recipe.create(data);
  }
}
