import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import { User, UpdateUserData } from '../domain/user.interface';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly user: UserRepository,
  ) {}

  async updateUser(
    id: string,
    data: UpdateUserData,
  ): Promise<Omit<User, 'password'>> {
    return this.user.update(id, data);
  }
}
