import { Injectable, Inject } from '@nestjs/common'
import type { IngredientRepository } from '../domain/ingredient.interface';
import type { IngredientResponseDto } from '../controllers/dto/ingredient-response.dto';
import { CreateIngredientDto } from '../controllers/dto/create-ingredient.dto';

@Injectable()
export class CreateIngredient {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async create(ingredient: CreateIngredientDto): Promise<IngredientResponseDto>{
        return this.ingredientRepository.create(ingredient)
    }
}