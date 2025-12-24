import { RecipeRepository } from "../domain/recipe.interface";
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import type { CreateRecipeDto } from "../controllers/dto/create-recipe.dto";
import type { UpdateRecipeDto } from "../controllers/dto/update-recipe.dto";
import type { RecipeResponseDto } from "../controllers/dto/recipe-response.dto";

@Injectable()
export class RecipeRepositoryImpl implements RecipeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<RecipeResponseDto[]> {
        return this.prisma.recipe.findMany({
            relationLoadStrategy: 'join',
            include: { 
                ingredients: true
            }
        });
    }
    async findById(id: number): Promise<RecipeResponseDto | null> {
        return this.prisma.recipe.findUnique({
            where: { id }
        });
    }
    async findByName(name: string): Promise<RecipeResponseDto | null> {
        return this.prisma.recipe.findFirst({
            where: { name: {
                contains: name,
                mode: 'insensitive'
            } }
        });
    }
    async create(recipe: CreateRecipeDto): Promise<RecipeResponseDto> {
        const { ingredients, ...rest } = recipe;
        return this.prisma.recipe.create({
            data: {
                ...rest,
                // recipe_ingredients table relation
                ingredients: ingredients 
                    ? { 
                        create: ingredients.map(ingredient => ({
                            quantity: ingredient.quantity,
                            unit: ingredient.unit,
                            ingredient: {
                                connect: { id: ingredient.ingredientId}
                            }
                        }))
                    }
                    : undefined,
            }
        });
    }
    async update(id: number, recipe: UpdateRecipeDto): Promise<RecipeResponseDto> {
        const { ingredients, ...rest } = recipe;
        return this.prisma.recipe.update({
            where: { id },
            data: {
                ...rest,
                // recipe_ingredients table relation
                ingredients: ingredients 
                    ? { 
                        create: ingredients.map(ingredient => ({
                            quantity: ingredient.quantity,
                            unit: ingredient.unit,
                            ingredient: {
                                connect: { id: ingredient.ingredientId}
                            }
                        }))
                    }
                    : undefined,
            }
        });
    }
    async delete(id: number): Promise<void> {
        await this.prisma.recipe.delete({
            where: { id }
        });
    }
}