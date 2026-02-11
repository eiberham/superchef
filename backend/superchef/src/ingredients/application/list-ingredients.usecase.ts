import { Injectable, Inject } from '@nestjs/common';
import type {
  IngredientRepository,
  Ingredient,
} from '../domain/ingredient.interface';

@Injectable()
export class ListIngredientsUsecase {
  constructor(
    @Inject('INGREDIENT_REPOSITORY')
    private readonly ingredient: IngredientRepository,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return this.ingredient.findAll();
  }
}
