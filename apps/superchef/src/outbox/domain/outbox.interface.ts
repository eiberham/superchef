import { Prisma } from "generated/prisma/client";

export interface OutboxEvent {
  id: string;
  topic: string;
  payload: string;
  status: OutboxStatus;
  error: string | null;
  attempts: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export enum OutboxStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED'
}

export type CreateOutboxEventData = Omit<OutboxEvent, 'id' | 'createdAt' | 'updatedAt' | 'attempts' | 'error'>;
export type UpdateOutboxEventData = Partial<Omit<OutboxEvent, 'id' | 'createdAt' | 'updatedAt'>>;

export interface OutboxRepository {
    findManyBy<T extends Prisma.OutboxEventWhereInput>(query: T): Promise<OutboxEvent[] | null>;
    create(user: CreateOutboxEventData): Promise<OutboxEvent>;
    update(id: string, user: UpdateOutboxEventData): Promise<OutboxEvent>;
}