import { Injectable } from '@nestjs/common';
import type { IngredientRepository } from '../interfaces/ingredient.interface';
import type { CreateIngredientDto } from '../dto/create-ingredient.dto';
import type { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import type { IngredientResponseDto } from '../dto/ingredient-response.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IngredientRepositoryImpl implements IngredientRepository {
    constructor( private readonly prisma: PrismaService ) {}

    async findAll(): Promise<IngredientResponseDto[]> {
        return this.prisma.ingredient.findMany()
    }

    async findById(id: number): Promise<IngredientResponseDto | null> {
        return this.prisma.ingredient.findUnique({
            where: { id }
        })
    }

    async create(ingredient: CreateIngredientDto): Promise<IngredientResponseDto> {
        return this.prisma.ingredient.create({
            data: ingredient
        })
    }

    async update(id: number, ingredient: UpdateIngredientDto): Promise<IngredientResponseDto> {
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