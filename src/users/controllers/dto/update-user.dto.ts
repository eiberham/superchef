import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: ['admin', 'viewer'], required: false })
    roles?: string[];
}