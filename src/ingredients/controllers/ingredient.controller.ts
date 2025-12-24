import { Controller, Get, Req, Post, Body, Put, Delete, Param, ParseIntPipe, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateIngredientUsecase } from '../application/create-ingredient.usecase'
import { UpdateIngredientUsecase } from '../application/update-ingredient.usecase';
import { ListIngredientsUsecase } from '../application/list-ingredients.usecase';
import { GetIngredientUsecase } from '../application/get-ingredient.usecase';
import { DeleteIngredientUsecase } from '../application/delete-ingredient.usecase';
import { IngredientResponseDto } from './dto/ingredient-response.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import type { Request } from 'express';

@Controller("ingredients")
export class IngredientController {
    constructor(
        private readonly createIngredient: CreateIngredientUsecase,
        private readonly updateIngredient: UpdateIngredientUsecase,
        private readonly listIngredients: ListIngredientsUsecase,
        private readonly getIngredient: GetIngredientUsecase,
        private readonly deleteIngredient: DeleteIngredientUsecase
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(@Req() request: Request): Promise<IngredientResponseDto[]> {
        return this.listIngredients.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Req() request: Request, @Param('id', ParseIntPipe) id: number) : Promise<IngredientResponseDto | null> {
        return this.getIngredient.findById(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    @ApiBody({ type: CreateIngredientDto })
    async create(@Req() request: Request, @Body(ValidationPipe) ingredient:  CreateIngredientDto): Promise<IngredientResponseDto> {
        return this.createIngredient.create(ingredient)
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    @ApiBody({ type: UpdateIngredientDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) ingredient:  UpdateIngredientDto
    ) : Promise<IngredientResponseDto>{
        return this.updateIngredient.update(id, ingredient)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.deleteIngredient.delete(id)
    }
}