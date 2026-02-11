import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import { UserNotFoundException } from '../../common/exceptions/user-not-found.exception';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class DeleteUserUsecase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new UserNotFoundException();
      }
      throw e;
    }
  }
}
