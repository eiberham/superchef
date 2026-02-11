import { Prisma } from 'generated/prisma/edge';

export interface PlanRepository {
  findAll(): Promise<Plan[]>;
  findBy<T extends Prisma.PlanWhereInput>(query: T): Promise<Plan | null>;
  create(data: CreatePlanData): Promise<Plan>;
  update(id: string, data: UpdatePlanData): Promise<Plan>;
  delete(id: string): Promise<void>;
}

export type CreatePlanData = Omit<Plan, 'id' | 'createdAt'>;
export type UpdatePlanData = Partial<Omit<Plan, 'id' | 'createdAt'>>;

export interface Plan {
  id: string;
  name: string;
  price: number;
  stripePriceId?: string | null;
  features: any;
  currency: string;
  createdAt: Date;
}
