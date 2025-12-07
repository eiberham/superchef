import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // You'll need to create this
import type { UserRepository } from '../interfaces/user.interface';
import type { CreateUserDto } from '../dto/create-user.dto';
import type { UserResponseDto } from '../dto/user-response.dto';

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
}