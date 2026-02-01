import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOutboxEventData, OutboxEvent, OutboxRepository, UpdateOutboxEventData} from '../domain/outbox.interface';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class PrismaOutboxRepository implements OutboxRepository {
  
  constructor(
    private prisma: PrismaService, 
  ) {}

  async create(data: CreateOutboxEventData) : Promise<OutboxEvent> {
    return this.prisma.outboxEvent.create({
      data
    })
  }

  async update(id: string, data: UpdateOutboxEventData) : Promise<OutboxEvent> {
    return this.prisma.outboxEvent.update({
      where: { id },
      data
    })
  }

  async findManyBy<T extends Prisma.OutboxEventWhereInput>(query: T) : Promise<OutboxEvent[] | null> {
    return this.prisma.outboxEvent.findMany({
      where: query,
      take: 20,
      orderBy: { createdAt: 'asc' }
    })
  }

}