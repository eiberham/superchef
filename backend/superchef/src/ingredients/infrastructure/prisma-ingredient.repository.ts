import { Injectable } from '@nestjs/common';
import type { IngredientRepository } from '../domain/ingredient.interface';
import {
  Ingredient,
  CreateIngredientData,
  UpdateIngredientData,
} from '../domain/ingredient.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class IngredientRepositoryImpl implements IngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async findById(id: string): Promise<Ingredient | null> {
    return this.prisma.ingredient.findUnique({
      where: { id },
    });
  }

  async findBy<T extends Prisma.IngredientWhereInput>(
    query: T,
  ): Promise<Ingredient | null> {
    return this.prisma.ingredient.findFirst({
      where: query,
    });
  }

  async create(ingredient: CreateIngredientData): Promise<Ingredient> {
    return this.prisma.ingredient.create({
      data: ingredient,
    });
  }

  async update(
    id: string,
    ingredient: UpdateIngredientData,
  ): Promise<Ingredient> {
    return this.prisma.ingredient.update({
      where: { id },
      data: ingredient,
    });
  }

  async delete(id: string): Promise<Ingredient> {
    return this.prisma.ingredient.delete({
      where: { id },
    });
  }
}
