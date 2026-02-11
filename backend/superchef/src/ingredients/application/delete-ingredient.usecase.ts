import { Injectable, Inject } from '@nestjs/common';
import type { IngredientRepository } from '../domain/ingredient.interface';
import { IngredientNotFoundException } from '../../common/exceptions/indredient-not-found.exception';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class DeleteIngredientUsecase {
  constructor(
    @Inject('INGREDIENT_REPOSITORY')
    private readonly ingredient: IngredientRepository,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      await this.ingredient.delete(id);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new IngredientNotFoundException();
      }
      throw e;
    }
  }
}
