import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import { UserNotFoundException } from '../../common/exceptions/user-not-found.exception';
import { User } from '../domain/user.interface';
import { Prisma } from 'generated/prisma/edge';

@Injectable()
export class GetUserByUsecase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly user: UserRepository,
  ) {}

  async findBy<T extends Prisma.UserWhereInput>(
    query: T,
  ): Promise<User | null> {
    const user = await this.user.findBy(query);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
