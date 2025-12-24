import { Injectable, Inject } from '@nestjs/common'
import type { IngredientRepository } from '../domain/ingredient.interface';
import type { IngredientResponseDto } from '../controllers/dto/ingredient-response.dto';

@Injectable()
export class ListIngredientsUsecase {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async findAll(): Promise<IngredientResponseDto[]> {
        return this.ingredientRepository.findAll()
    }

}