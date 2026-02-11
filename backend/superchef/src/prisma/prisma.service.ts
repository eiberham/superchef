import { readReplicas } from '@prisma/extension-read-replicas'
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService implements OnModuleInit {
  private prisma: any;

  constructor(private configService: ConfigService) {
    const primaryPool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
    });

    const primaryAdapter = new PrismaPg(primaryPool);
    const primaryClient = new PrismaClient({ adapter: primaryAdapter });

    const replicaUrl = this.configService.get<string>('REPLICA_URL');

    if (replicaUrl) {
      const replicaPool = new Pool({
        connectionString: replicaUrl,
      });
      const replicaAdapter = new PrismaPg(replicaPool);
      const replicaClient = new PrismaClient({ adapter: replicaAdapter });

      this.prisma = primaryClient.$extends(
        readReplicas({ replicas: [replicaClient] })
      );
    } else {
      this.prisma = primaryClient;
    }
  }

  // Proxy all Prisma client properties and methods
  get $extends() {
    return this.prisma.$extends.bind(this.prisma);
  }

  get $transaction() {
    return this.prisma.$transaction.bind(this.prisma);
  }

  get $connect() {
    return this.prisma.$connect.bind(this.prisma);
  }

  get $disconnect() {
    return this.prisma.$disconnect.bind(this.prisma);
  }

  // Model getters
  get user() {
    return this.prisma.user;
  }

  get recipe() {
    return this.prisma.recipe;
  }

  get ingredient() {
    return this.prisma.ingredient;
  }

  get recipeIngredient() {
    return this.prisma.recipeIngredient;
  }

  get role() {
    return this.prisma.role;
  }

  get userRole() {
    return this.prisma.userRole;
  }

  get plan() {
    return this.prisma.plan;
  }

  get subscription() {
    return this.prisma.subscription;
  }

  get refreshToken() {
    return this.prisma.refreshToken;
  }

  get outboxEvent() {
    return this.prisma.outboxEvent;
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
