import { Injectable } from '@nestjs/common';
import type { Ingredient, IngredientRepository } from '../interfaces/ingredient.interface';
import type { CreateIngredientDTO } from '../dto/create-ingredient.dto';
import type { UpdateIngredientDTO } from '../dto/update-ingredient.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IngredientRepositoryImpl implements IngredientRepository {
    constructor( private readonly prisma: PrismaService ) {}

    async findAll(): Promise<Ingredient[]> {
        return this.prisma.ingredient.findMany()
    }

    async findById(id: number): Promise<Ingredient | null> {
        return this.prisma.ingredient.findUnique({
            where: { id }
        })
    }

    async create(ingredient: CreateIngredientDTO): Promise<Ingredient> {
        return this.prisma.ingredient.create({
            data: ingredient
        })
    }

    async update(id: number, ingredient: UpdateIngredientDTO): Promise<Ingredient> {
        return this.prisma.ingredient.update({
            where: { id },
            data: ingredient
        })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.ingredient.delete({
            where: { id }
        })
    }
}