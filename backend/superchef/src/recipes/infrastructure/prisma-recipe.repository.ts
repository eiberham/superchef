import { RecipeRepository } from '../domain/recipe.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRecipeData } from '../domain/recipe.interface';
import { UpdateRecipeData } from '../domain/recipe.interface';
import { Recipe } from '../domain/recipe.interface';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class RecipeRepositoryImpl implements RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      relationLoadStrategy: 'join',
      include: {
        ingredients: true,
      },
    });
  }

  async findBy<T extends Prisma.RecipeWhereInput>(
    query: T,
  ): Promise<Recipe | null> {
    const where: Prisma.RecipeWhereInput = { ...query };

    if (query.name && typeof query.name === 'string') {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }

    return this.prisma.recipe.findFirst({
      where,
      include: {
        ingredients: true,
      },
    });
  }

  async create(recipe: CreateRecipeData): Promise<Recipe> {
    const { ingredients, ...rest } = recipe;
    const created = await this.prisma.recipe.create({
      data: {
        ...rest,
        // recipe_ingredients table relation
        ingredients: ingredients
          ? {
              create: ingredients.map((ingredient) => ({
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                ingredient: {
                  connect: { id: ingredient.ingredientId },
                },
              })),
            }
          : undefined,
      },
    });
    return created;
  }

  async update(id: string, recipe: UpdateRecipeData): Promise<Recipe> {
    const { ingredients, ...rest } = recipe;
    const updated = await this.prisma.recipe.update({
      where: { id },
      data: {
        ...rest,
        // recipe_ingredients table relation
        ingredients: ingredients
          ? {
              create: ingredients.map((ingredient) => ({
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                ingredient: {
                  connect: { id: ingredient.ingredientId },
                },
              })),
            }
          : undefined,
      },
    });
    return updated;
  }

  async delete(id: string): Promise<Recipe> {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}
