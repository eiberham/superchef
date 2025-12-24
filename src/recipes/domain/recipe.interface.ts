import type { RecipeResponseDto } from '../controllers/dto/recipe-response.dto'
import type { CreateRecipeDto } from '../controllers/dto/create-recipe.dto'
import type { UpdateRecipeDto } from '../controllers/dto/update-recipe.dto'

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
    findByName(name: string): Promise<RecipeResponseDto | null>;
    create(recipe: CreateRecipeDto): Promise<RecipeResponseDto>;
    update(id: number, recipe: UpdateRecipeDto): Promise<RecipeResponseDto>;
    delete(id: number): Promise<void>;
}