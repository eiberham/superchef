import { Controller, Get, Req, Param, Post, Put, Delete } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(@Req() request: Request): Promise<UserResponseDto[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Req() request: Request, @Param('id') id: string): Promise<UserResponseDto | null> {
        const idNumber = Number(id);
        return this.userService.getUserById(idNumber);
    }

    @Post()
    async createUser(@Req() request: Request): Promise<UserResponseDto> {
        const userData = request.body;
        return this.userService.createUser(userData);
    }

    @Put(':id')
    async updateUser(@Req() request: Request, @Param('id') id: string): Promise<UserResponseDto> {
        const idNumber = Number(id);
        const userData = request.body;
        return this.userService.updateUser(idNumber, userData);
    }

    @Delete(':id')
    async deleteUser(@Req() request: Request, @Param('id') id: string): Promise<void> {
        const idNumber = Number(id);
        return this.userService.deleteUser(idNumber);
    }
}