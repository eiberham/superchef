import { Injectable, Inject } from '@nestjs/common';
import type { PlanRepository } from '../domain/plan.interface';

@Injectable()
export class DeletePlanUsecase {
  constructor(
    @Inject('PLAN_REPOSITORY')
    private readonly plan: PlanRepository,
  ) {}

  async deletePlan(id: string): Promise<void> {
    return this.plan.delete(id);
  }
}
