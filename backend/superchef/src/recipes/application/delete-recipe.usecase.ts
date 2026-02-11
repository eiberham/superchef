import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepository } from '../domain/recipe.interface';
import { RecipeNotFoundException } from '../../common/exceptions/recipe-not-found.exception';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class DeleteRecipeUsecase {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipe: RecipeRepository,
  ) {}

  async deleteRecipe(id: string): Promise<void> {
    try {
      await this.recipe.delete(id);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new RecipeNotFoundException();
      }
      throw e;
    }
  }
}
