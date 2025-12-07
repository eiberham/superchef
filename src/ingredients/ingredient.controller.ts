import { Controller, Get, Req } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientResponseDTO } from './dto/ingredient-response.dto';
import type { Request } from 'express';

@Controller("ingredients")
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<IngredientResponseDTO[]> {
        return this.ingredientService.findAll();
    }
}