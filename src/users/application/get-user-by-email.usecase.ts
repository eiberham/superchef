import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import type { User } from '../domain/user.interface';

@Injectable()
export class GetUserByEmailUsecase{
    constructor(
        @Inject('USER_REPOSITORY') 
        private readonly userRepository: UserRepository
    ) {}

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email)
    }
}