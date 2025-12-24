import { Injectable, Inject } from '@nestjs/common'
import type { IngredientRepository } from '../domain/ingredient.interface';
import type { IngredientResponseDto } from '../controllers/dto/ingredient-response.dto';

@Injectable()
export class GetIngredientUsecase {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async findById(id: number): Promise<IngredientResponseDto | null> {
        return this.ingredientRepository.findById(id)
    }
}