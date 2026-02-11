import { Injectable } from '@nestjs/common';
import {
  CreatePlanData,
  UpdatePlanData,
  Plan,
  PlanRepository,
} from '../domain/plan.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Plan[]> {
    return this.prisma.plan.findMany();
  }

  async findBy<T extends Prisma.PlanWhereInput>(
    query: T,
  ): Promise<Plan | null> {
    const plan = await this.prisma.plan.findFirst({
      where: query,
    });

    if (!plan) {
      return null;
    }

    return plan;
  }

  async create(data: CreatePlanData): Promise<Plan> {
    return this.prisma.plan.create({
      data,
    });
  }

  async update(id: string, data: UpdatePlanData): Promise<Plan> {
    return this.prisma.plan.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.plan.delete({
      where: { id },
    });
  }
}
