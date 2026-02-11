import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import { UserResponseData } from '../domain/user.interface';

@Injectable()
export class ListUsersUsecase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<UserResponseData[]> {
    return this.userRepository.findAll();
  }
}
