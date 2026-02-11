import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Body,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetPlansUsecase } from '../application/get-plans.usecase';
import { RolesGuard } from 'backend/superchef/src/auth/guards/roles.guard';
import { AuthGuard } from 'backend/superchef/src/auth/guards/auth.guard';
import { Role } from 'backend/superchef/src/auth/domain/role.enum';
import { Roles } from 'backend/superchef/src/auth/decorators/roles.decorator';
import { GetPlanByUsecase } from '../application/get-plan-by.usecase';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { CreatePlanUsecase } from '../application/create-plan.usecase';
import { PlanResponseDto } from './dto/plan-response.dto';
import { UpdatePlanUsecase } from '../application/update-plan.usecase';
import { DeletePlanUsecase } from '../application/delete-plan.usecase';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL, CacheKey } from '@nestjs/cache-manager';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('plans')
export class PlanController {
  constructor(
    private readonly getPlansUsecase: GetPlansUsecase,
    private readonly getPlanByUsecase: GetPlanByUsecase,
    private readonly createPlanUsecase: CreatePlanUsecase,
    private readonly updatePlanUsecase: UpdatePlanUsecase,
    private readonly deletePlanUsecase: DeletePlanUsecase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @CacheKey('plans:all')
  @Get()
  async getPlans(): Promise<PlanResponseDto[]> {
    return this.getPlansUsecase.getPlans();
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':id')
  async getPlanById(
    @Param('id') id: string,
  ): Promise<PlanResponseDto | null> {
    return this.getPlanByUsecase.findBy({ id });
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  @Post()
  async createPlan(
    @Body(ValidationPipe) data: CreatePlanDto,
  ): Promise<PlanResponseDto> {
    return this.createPlanUsecase.createPlan(data);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updatePlan(
    @Body(ValidationPipe) data: UpdatePlanDto,
    @Param('id') id: string,
  ): Promise<PlanResponseDto> {
    return this.updatePlanUsecase.updatePlan(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deletePlan(@Param('id') id: string): Promise<void> {
    await this.deletePlanUsecase.deletePlan(id);
  }
}
