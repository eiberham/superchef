import { Injectable, Inject } from '@nestjs/common'
import type { IngredientRepository } from '../domain/ingredient.interface';

@Injectable()
export class DeleteIngredientUsecase {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async delete(id: number): Promise<void> {
        return this.ingredientRepository.delete(id)
    }
}