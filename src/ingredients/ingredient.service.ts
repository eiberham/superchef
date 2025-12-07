import { Injectable, Inject } from '@nestjs/common'
import type { Ingredient, IngredientRepository } from './interfaces/ingredient.interface';

@Injectable()
export class IngredientService {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async findAll(): Promise<Ingredient[]> {
        return this.ingredientRepository.findAll();
    }
}