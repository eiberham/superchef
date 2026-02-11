import { Injectable, Inject } from '@nestjs/common';
import type {
  CreatePlanData,
  PlanRepository,
  Plan,
} from '../domain/plan.interface';

@Injectable()
export class CreatePlanUsecase {
  constructor(
    @Inject('PLAN_REPOSITORY')
    private readonly plan: PlanRepository,
  ) {}

  async createPlan(data: CreatePlanData): Promise<Plan> {
    return this.plan.create(data);
  }
}
