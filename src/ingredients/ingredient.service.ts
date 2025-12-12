import { Injectable, Inject } from '@nestjs/common'
import type { IngredientRepository } from './interfaces/ingredient.interface';
import type { CreateIngredientDto } from './dto/create-ingredient.dto';
import type { UpdateIngredientDto } from './dto/update-ingredient.dto';
import type { IngredientResponseDto } from './dto/ingredient-response.dto';

@Injectable()
export class IngredientService {
    constructor(
        @Inject('INGREDIENT_REPOSITORY') 
        private readonly ingredientRepository: IngredientRepository
    ) {}

    async findAll(): Promise<IngredientResponseDto[]> {
        return this.ingredientRepository.findAll()
    }

    async findById(id: number): Promise<IngredientResponseDto | null> {
        return this.ingredientRepository.findById(id)
    }

    async create(ingredient: CreateIngredientDto): Promise<IngredientResponseDto>{
        return this.ingredientRepository.create(ingredient)
    }

    async update(id: number, ingredient: UpdateIngredientDto) : Promise<IngredientResponseDto>{
        return this.ingredientRepository.update(id, ingredient)
    }

    async delete(id: number): Promise<void> {
        return this.ingredientRepository.delete(id)
    }
}