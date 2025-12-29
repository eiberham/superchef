import { Controller, ParseIntPipe, ValidationPipe, Get, Req, Param, Post, Put, Delete, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';
import { CreateUserUsecase } from '../application/create-user.usecase';
import { UpdateUserUsecase } from '../application/update-user.usecase';
import { ListUsersUsecase } from '../application/list-users.usecase';
import { GetUserUsecase } from '../application/get-user.usecase';
import { DeleteUserUsecase } from '../application/delete-user.usecase';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/domain/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUsecase: CreateUserUsecase,
        private readonly updateUserUsecase: UpdateUserUsecase,
        private readonly listUsersUsecase: ListUsersUsecase,
        private readonly getUserUsecase: GetUserUsecase,
        private readonly deleteUserUsecase: DeleteUserUsecase
    ) {}

    @HttpCode(HttpStatus.OK)
    @Roles(Role.ADMIN)
    @Get()
    async getUsers(@Req() request: Request): Promise<UserResponseDto[]> {
        return this.listUsersUsecase.getUsers();
    }

    @HttpCode(HttpStatus.OK)
    @Roles(Role.ADMIN)
    @Get(':id')
    async getUserById(@Req() request: Request, @Param('id', ParseIntPipe) id: number): Promise<UserResponseDto | null> {
        return this.getUserUsecase.getUserById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.ADMIN)
    @Post()
    @ApiBody({ type: CreateUserDto })
    async createUser(@Req() request: Request, @Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const userData = createUserDto;
        return this.createUserUsecase.createUser(userData);
    }

    @HttpCode(HttpStatus.OK)
    @Roles(Role.ADMIN)
    @Put(':id')
    @ApiBody({ type: UpdateUserDto })
    async updateUser(@Req() request: Request, @Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const userData = updateUserDto;
        return this.updateUserUsecase.updateUser(id, userData);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async deleteUser(@Req() request: Request, @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.deleteUserUsecase.deleteUser(id);
    }
}