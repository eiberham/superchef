import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UserRepository, User } from '../domain/user.interface';
import type { CreateUserDto } from '../controllers/dto/create-user.dto';
import type { UserResponseDto } from '../controllers/dto/user-response.dto';
import { UpdateUserDto } from '../controllers/dto/update-user.dto';

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

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const { name, email, username, password, roles } = data;
    return this.prisma.user.create({
      data: { 
        name, email, username, password,
        userRoles: {
          create: roles?.map(role => ({
            role: {
              connect: { name: role }
            }
          })) || []
        }
      }
    });
  }

  async update(id: number, data: UpdateUserDto ): Promise<UserResponseDto> {
    const { name, email, username, password, roles } = data;
    return this.prisma.user.update({
      where: { id },
      data: {
        name, email, username, password,
        userRoles: roles ? {
          deleteMany: {},
          create: roles.map(role => ({
            role: {
              connect: { name: role }
            }
          }))
        } : undefined
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }
}