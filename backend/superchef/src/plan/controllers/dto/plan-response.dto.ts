import { JsonValue } from 'generated/prisma/runtime/client';

export class PlanResponseDto {
  id: string;
  name: string;
  price: number;
  stripePriceId?: string | null;
  features: JsonValue;
  currency: string;
  createdAt: Date;
}
