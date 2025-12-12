import type { RecipeResponseDto } from '../dto/recipe-response.dto'
import type { CreateRecipeDto } from '../dto/create-recipe.dto'
import type { UpdateRecipeDto } from '../dto/update-recipe.dto'

export interface Recipe {
    id: number;
    name: string;
    description: string | null;
    steps: string;
    imageUrl: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeRepository {
    findAll(): Promise<RecipeResponseDto[]>;
    findById(id: number): Promise<RecipeResponseDto | null>;
    create(recipe: CreateRecipeDto): Promise<RecipeResponseDto>;
    update(id: number, recipe: UpdateRecipeDto): Promise<RecipeResponseDto>;
    delete(id: number): Promise<void>;
}