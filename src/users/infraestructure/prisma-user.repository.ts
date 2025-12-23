import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // You'll need to create this
import type { UserRepository, User } from '../domain/user.interface';
import type { CreateUserDto } from '../controllers/dto/create-user.dto';
import type { UserResponseDto } from '../controllers/dto/user-response.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({ omit: { password: true} });
  }

  async findById(id: number): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async create(userData: CreateUserDto): Promise<UserResponseDto> {
    return this.prisma.user.create({
      data: userData
    });
  }

  async update(id: number, userData: Partial<UserResponseDto>): Promise<UserResponseDto> {
    return this.prisma.user.update({
      where: { id },
      data: userData
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }

  async assignRoles(userId: number, roles: string[]): Promise<void> {
    const roleRecords = await this.prisma.role.findMany({
      where: {
        name: { in: roles }
      }
    })

    if (roleRecords.length !== roles.length) {
      throw new Error('One or more roles are invalid');
    }

    const userRoleData = roleRecords.map(role => ({
      userId,
      roleId: role.id
    }));

    await this.prisma.userRole.createMany({
      data: userRoleData
    });
  }
}