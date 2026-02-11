import { Injectable, Inject } from '@nestjs/common';
import type { IngredientRepository } from '../domain/ingredient.interface';
import { Ingredient } from '../domain/ingredient.interface';
import { IngredientNotFoundException } from '../../common/exceptions/indredient-not-found.exception';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class GetIngredientByUsecase {
  constructor(
    @Inject('INGREDIENT_REPOSITORY')
    private readonly ingredient: IngredientRepository,
  ) {}

  async findBy<T extends Prisma.IngredientWhereInput>(
    query: T,
  ): Promise<Ingredient | null> {
    const ingredient = await this.ingredient.findBy(query);
    if (!ingredient) {
      throw new IngredientNotFoundException();
    }
    return ingredient;
  }
}
