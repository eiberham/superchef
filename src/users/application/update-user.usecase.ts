import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.interface';
import type { UserResponseDto } from '../controllers/dto/user-response.dto';
import { UpdateUserDto } from '../controllers/dto/update-user.dto';

@Injectable()
export class UpdateUserUsecase{
    constructor(
        @Inject('USER_REPOSITORY') 
        private readonly userRepository: UserRepository
    ) {}

    async updateUser(id: number, data: UpdateUserDto): Promise<UserResponseDto> {
        return this.userRepository.update(id, data)
    }
}