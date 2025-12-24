import { Injectable, Inject } from '@nestjs/common'
import type { IngredientRepository } from '../domain/ingredient.interface';
import type { IngredientResponseDto } from '../controllers/dto/ingredient-response.dto';
import { UpdateIngredientDto } from '../controllers/dto/update-ingredient.dto';

@Injectable()
export class UpdateIngredientUsecase {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async update(id: number, ingredient: UpdateIngredientDto) : Promise<IngredientResponseDto>{
        return this.ingredientRepository.update(id, ingredient)
    }

}