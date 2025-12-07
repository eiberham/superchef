import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from './interfaces/user.interface';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService{
    constructor(
        @Inject('USER_REPOSITORY') 
        private readonly userRepository: UserRepository
    ) {}

    async getUsers(): Promise<UserResponseDto[]> {
        return this.userRepository.findAll()
    }

    async getUserById(id: number): Promise<UserResponseDto | null> {
        return this.userRepository.findById(id)
    }

    async createUser( userData : CreateUserDto ): Promise<UserResponseDto> {
        return this.userRepository.create(userData)
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<UserResponseDto> {
        return this.userRepository.update(id, userData)
    }

    async deleteUser(id: number): Promise<void> {
        return this.userRepository.delete(id)
    }
}