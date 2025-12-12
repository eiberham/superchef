import { Controller, Get, Req, Post, Body, Put, Delete, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';
import { IngredientResponseDto } from './dto/ingredient-response.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import type { Request } from 'express';

@Controller("ingredients")
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<IngredientResponseDto[]> {
        return this.ingredientService.findAll();
    }

    @Get(':id')
    async findById(@Req() request: Request, @Param('id', ParseIntPipe) id: number) : Promise<IngredientResponseDto | null> {
        return this.ingredientService.findById(id)
    }

    @Post()
    @ApiBody({ type: CreateIngredientDto })
    async create(@Req() request: Request, @Body(ValidationPipe) ingredient:  CreateIngredientDto): Promise<IngredientResponseDto> {
        return this.ingredientService.create(ingredient)
    }

    @Put(':id')
    @ApiBody({ type: UpdateIngredientDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) ingredient:  UpdateIngredientDto
    ) : Promise<IngredientResponseDto>{
        return this.ingredientService.update(id, ingredient)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.ingredientService.delete(id)
    }
}