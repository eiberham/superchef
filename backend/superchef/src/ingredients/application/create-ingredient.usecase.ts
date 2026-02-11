import { Injectable, Inject } from '@nestjs/common';
import type {
  IngredientRepository,
  Ingredient,
} from '../domain/ingredient.interface';
import { CreateIngredientData } from '../domain/ingredient.interface';

@Injectable()
export class CreateIngredientUsecase {
  constructor(
    @Inject('INGREDIENT_REPOSITORY')
    private readonly ingredient: IngredientRepository,
  ) {}

  async create(data: CreateIngredientData): Promise<Ingredient> {
    return this.ingredient.create(data);
  }
}
