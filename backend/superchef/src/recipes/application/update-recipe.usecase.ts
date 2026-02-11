import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepository, Recipe } from '../domain/recipe.interface';

import { UpdateRecipeData } from '../domain/recipe.interface';

@Injectable()
export class UpdateRecipeUsecase {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipe: RecipeRepository,
  ) {}

  async updateRecipe(
    id: string,
    recipeData: UpdateRecipeData,
  ): Promise<Recipe> {
    return this.recipe.update(id, recipeData);
  }
}
