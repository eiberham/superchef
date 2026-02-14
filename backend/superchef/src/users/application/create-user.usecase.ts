import bcrypt from 'bcrypt';
import { Injectable, Inject, Logger } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import { UserResponseData } from '../domain/user.interface';
import { CreateUserData } from '../domain/user.interface';

@Injectable()
export class CreateUserUsecase {
  private logger = new Logger(CreateUserUsecase.name);

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly user: UserRepository
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  }

  async createUser(data: CreateUserData): Promise<UserResponseData> {
    let user: UserResponseData | null = null;
    try {
      const hashed = await this.hashPassword(data.password);

      const payload = {
        ...data,
        password: hashed,
      };

      user = await this.user.create(payload);
      this.logger.log(`User created: ${user.email}`);

      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${data.email}`, error.stack);
      throw error;
    }
  }
}
