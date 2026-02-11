import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepository, Recipe } from '../domain/recipe.interface';

@Injectable()
export class ListRecipesUsecase {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipe: RecipeRepository,
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipe.findAll();
  }
}
