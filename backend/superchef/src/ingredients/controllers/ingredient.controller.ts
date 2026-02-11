import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateIngredientUsecase } from '../application/create-ingredient.usecase';
import { UpdateIngredientUsecase } from '../application/update-ingredient.usecase';
import { ListIngredientsUsecase } from '../application/list-ingredients.usecase';
import { GetIngredientByUsecase } from '../application/get-ingredient-by.usecase';
import { DeleteIngredientUsecase } from '../application/delete-ingredient.usecase';
import { IngredientResponseDto } from './dto/ingredient-response.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import type { Request } from 'express';
import { Role } from 'backend/superchef/src/auth/domain/role.enum';
import { Roles } from 'backend/superchef/src/auth/decorators/roles.decorator';
import { AuthGuard } from 'backend/superchef/src/auth/guards/auth.guard';
import { RolesGuard } from 'backend/superchef/src/auth/guards/roles.guard';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL, CacheKey } from '@nestjs/cache-manager';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('ingredients')
export class IngredientController {
  constructor(
    private readonly createIngredient: CreateIngredientUsecase,
    private readonly updateIngredient: UpdateIngredientUsecase,
    private readonly listIngredients: ListIngredientsUsecase,
    private readonly getIngredient: GetIngredientByUsecase,
    private readonly deleteIngredient: DeleteIngredientUsecase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VIEWER)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @CacheKey('ingredients:all')
  @Get()
  async findAll(@Req() request: Request): Promise<IngredientResponseDto[]> {
    return this.listIngredients.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VIEWER)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':id')
  async findById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<IngredientResponseDto | null> {
    return this.getIngredient.findBy({ id });
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN, Role.VIEWER)
  @Post()
  @ApiBody({ type: CreateIngredientDto })
  async create(
    @Req() request: Request,
    @Body(ValidationPipe) ingredient: CreateIngredientDto,
  ): Promise<IngredientResponseDto> {
    return this.createIngredient.create(ingredient);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VIEWER)
  @Put(':id')
  @ApiBody({ type: UpdateIngredientDto })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) ingredient: UpdateIngredientDto,
  ): Promise<IngredientResponseDto> {
    return this.updateIngredient.update(id, ingredient);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN, Role.VIEWER)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteIngredient.delete(id);
  }
}
