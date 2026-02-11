import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepository, Recipe } from '../domain/recipe.interface';
import { RecipeNotFoundException } from '../../common/exceptions/recipe-not-found.exception';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class GetRecipeByUsecase {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipe: RecipeRepository,
  ) {}

  async getRecipeBy<T extends Prisma.RecipeWhereInput>(
    query: T,
  ): Promise<Recipe | null> {
    const recipe = await this.recipe.findBy(query);
    if (!recipe) {
      throw new RecipeNotFoundException();
    }
    return recipe;
  }
}
