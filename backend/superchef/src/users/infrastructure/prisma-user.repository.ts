import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type {
  UserRepository,
  User,
  Subscription,
} from '../domain/user.interface';
import { UserResponseData } from '../domain/user.interface';
import { UpdateUserData } from '../domain/user.interface';
import { CreateUserData } from '../domain/user.interface';
import { PlanNotFoundException } from 'backend/superchef/src/common/exceptions/plan-not-found.exception';
import { UserNotFoundException } from 'backend/superchef/src/common/exceptions/user-not-found.exception';
import { Prisma, OutboxStatus } from 'generated/prisma/edge';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponseData[]> {
    const data = await this.prisma.user.findMany({
      relationLoadStrategy: 'join',
      include: {
        roles: {
          include: {
            role: {
              select: { name: true },
            },
          },
        },
        subscription: {
          include: {
            plan: {
              select: { name: true },
            },
          },
        },
      },
      omit: { password: true },
    });

    const users = data.map(({ preferences, roles, subscription, ...user }) => ({
      ...user,
      preferences: preferences ?? { diet: 'none', allergies: [] },
      roles: roles?.map((ur) => ur.role.name) || [],
      subscription: (subscription?.plan.name ?? 'free') as Subscription,
    }));

    return users;
  }

  async findBy<T extends Prisma.UserWhereInput>(
    query: T,
  ): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: { ...query },
      relationLoadStrategy: 'join',
      include: {
        roles: {
          include: { role: true },
        },
        subscription: {
          include: {
            plan: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!data) return null;

    return {
      ...data,
      preferences: data.preferences ?? { diet: 'none', allergies: [] },
      roles: data.roles?.map((ur) => ur.role.name) || [],
      subscription: (data.subscription?.plan.name ?? 'free') as Subscription,
    };
  }

  async create(data: CreateUserData): Promise<UserResponseData> {
    const {
      name,
      email,
      username,
      password,
      roles,
      preferences,
      subscription,
    } = data;

    console.log('hey')

    const plan =
      subscription &&
      (await this.prisma.plan.findUnique({
        where: { name: subscription },
      }));

    if (subscription && !plan) {
      throw new PlanNotFoundException();
    }

    console.log('bye')

    const user = await this.prisma.$transaction(async (prisma) => {
        const u = await this.prisma.user.create({
          data: {
            name,
            email,
            username,
            password,
            ...(preferences && { preferences }),
            roles: {
              create:
                roles?.map((role) => ({
                  role: {
                    connect: { name: role },
                  },
                })) || [],
            },
            subscription: {
              create: subscription
                ? {
                    status: 'active',
                    stripeSubscriptionId: '',
                    currentPeriodEnd: null,
                    plan: {
                      connect: {
                        id: plan!.id,
                        name: subscription,
                      },
                    },
                  }
                : undefined,
            },
          },
        });

        await prisma.outboxEvent.create({
          data: {
            topic: 'user_registered',
            payload: JSON.stringify({
              name: u.name,
              to: u.email,
              subject: 'Welcome to superchef!',
              body: `
                Thank you for registering at superchef. 
                We are excited to have you on board! 
                `,
            }),
            status: OutboxStatus.PENDING,
          },
        });

        return u;
    })

    return user;
  }

  async update(id: string, data: UpdateUserData): Promise<UserResponseData> {
    const {
      name,
      email,
      username,
      password,
      preferences,
      roles,
      subscription,
      stripeCustomerId,
    } = data;

    const plan =
      subscription &&
      (await this.prisma.plan.findUnique({
        where: { name: subscription },
      }));

    if (subscription && !plan) {
      throw new PlanNotFoundException();
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        username,
        password,
        stripeCustomerId,
        ...(preferences && { preferences }),
        roles: roles
          ? {
              deleteMany: {},
              create: roles.map((role) => ({
                role: {
                  connect: { name: role },
                },
              })),
            }
          : undefined,
      },
    });

    return user;
  }

  async delete(id: string): Promise<UserResponseData> {
    const exists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new UserNotFoundException();
    }

    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
