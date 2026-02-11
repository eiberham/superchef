import { Injectable, Inject } from '@nestjs/common';
import type { PlanRepository, Plan } from '../domain/plan.interface';

@Injectable()
export class GetPlansUsecase {
  constructor(
    @Inject('PLAN_REPOSITORY')
    private readonly plan: PlanRepository,
  ) {}

  async getPlans(): Promise<Plan[]> {
    return this.plan.findAll();
  }
}
