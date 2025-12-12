import { Controller, ParseIntPipe, ValidationPipe, Get, Req, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import type { Request } from 'express';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(@Req() request: Request): Promise<UserResponseDto[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Req() request: Request, @Param('id', ParseIntPipe) id: number): Promise<UserResponseDto | null> {
        return this.userService.getUserById(id);
    }

    @Post()
    @ApiBody({ type: CreateUserDto })
    async createUser(@Req() request: Request, @Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const userData = createUserDto;
        return this.userService.createUser(userData);
    }

    @Put(':id')
    @ApiBody({ type: UpdateUserDto })
    async updateUser(@Req() request: Request, @Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const userData = updateUserDto;
        return this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    async deleteUser(@Req() request: Request, @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}