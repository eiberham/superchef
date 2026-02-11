import {
  Controller,
  ValidationPipe,
  Get,
  Req,
  Param,
  Body,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRecipeUsecase } from '../application/create-recipe.usecase';
import { UpdateRecipeUsecase } from '../application/update-recipe.usecase';
import { GetRecipeByUsecase } from '../application/get-recipe-by.usecase';
import { DeleteRecipeUsecase } from '../application/delete-recipe.usecase';
import { ListRecipesUsecase } from '../application/list-recipes.usecase';
import type { Request } from 'express';
import type { RecipeResponseDto } from './dto/recipe-response.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RolesGuard } from 'backend/superchef/src/auth/guards/roles.guard';
import { AuthGuard } from 'backend/superchef/src/auth/guards/auth.guard';
import { Role } from 'backend/superchef/src/auth/domain/role.enum';
import { Roles } from 'backend/superchef/src/auth/decorators/roles.decorator';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL, CacheKey } from '@nestjs/cache-manager';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUsecase: CreateRecipeUsecase,
    private readonly updateRecipeUsecase: UpdateRecipeUsecase,
    private readonly getRecipeByUsecase: GetRecipeByUsecase,
    private readonly deleteRecipeUsecase: DeleteRecipeUsecase,
    private readonly listRecipesUsecase: ListRecipesUsecase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VIEWER)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @CacheKey('recipes:all')
  @Get()
  async getRecipes(@Req() req: Request): Promise<RecipeResponseDto[]> {
    return this.listRecipesUsecase.getRecipes();
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VIEWER)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':id')
  async getRecipeById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<RecipeResponseDto | null> {
    return this.getRecipeByUsecase.getRecipeBy({ id });
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN, Role.VIEWER)
  @Post()
  @ApiBody({ type: CreateRecipeDto })
  async createRecipe(
    @Body(ValidationPipe) recipeData: CreateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.createRecipeUsecase.createRecipe(recipeData);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VIEWER)
  @Put(':id')
  @ApiBody({ type: UpdateRecipeDto })
  async updateRecipe(
    @Param('id') id: string,
    @Body(ValidationPipe) recipeData: UpdateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.updateRecipeUsecase.updateRecipe(id, recipeData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN, Role.VIEWER)
  @Delete(':id')
  async deleteRecipe(@Param('id') id: string): Promise<void> {
    return this.deleteRecipeUsecase.deleteRecipe(id);
  }
}
