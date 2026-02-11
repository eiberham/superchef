import { Injectable, Inject } from '@nestjs/common';
import type { PlanRepository, Plan } from '../domain/plan.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class GetPlanByUsecase {
  constructor(
    @Inject('PLAN_REPOSITORY')
    private readonly plan: PlanRepository,
  ) {}

  async findBy<T extends Prisma.PlanWhereInput>(
    query: T,
  ): Promise<Plan | null> {
    return this.plan.findBy(query);
  }
}
