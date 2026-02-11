import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { GetPlanByUsecase } from './application/get-plan-by.usecase';
import { GetPlansUsecase } from './application/get-plans.usecase';
import { DeletePlanUsecase } from './application/delete-plan.usecase';
import { UpdatePlanUsecase } from './application/update-plan.usecase';
import { CreatePlanUsecase } from './application/create-plan.usecase';
import { PrismaPlanRepository } from './infrastructure/prisma-plan.repository';
import { PrismaService } from 'backend/superchef/src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PlanController],
  providers: [
    {
      provide: 'PLAN_REPOSITORY',
      useClass: PrismaPlanRepository,
    },
    GetPlansUsecase,
    GetPlanByUsecase,
    CreatePlanUsecase,
    UpdatePlanUsecase,
    DeletePlanUsecase,
    PrismaService,
    JwtService,
  ],
  exports: ['PLAN_REPOSITORY'],
})
export class PlanModule {}
