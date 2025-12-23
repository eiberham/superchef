import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import type { UserResponseDto } from '../controllers/dto/user-response.dto';
import { CreateUserDto } from '../controllers/dto/create-user.dto';

@Injectable()
export class CreateUserUsecase{
    constructor(
        @Inject('USER_REPOSITORY') 
        private readonly userRepository: UserRepository
    ) {}

    async createUser( userData : CreateUserDto ): Promise<UserResponseDto> {
        let user: UserResponseDto | null = null;
        try {
            user = await this.userRepository.create(userData);
            if (userData.roles && userData.roles.length > 0) {
                await this.userRepository.assignRoles(user.id, userData.roles);
            }
            return user;
        } catch (error) {
            if (user) await this.userRepository.delete(user.id);
            throw error;
        }
    }
}