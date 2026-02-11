import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { Subscription } from '../../domain/user.interface';
import type { JsonValue } from 'generated/prisma/runtime/client';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  stripeSubscriptionId?: string;

  @ApiProperty({ example: '{ diet: "vegan", allergies: ["nuts"] }' })
  @IsOptional()
  preferences?: JsonValue;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ example: ['admin', 'viewer'], required: false })
  roles?: string[];

  @IsString()
  @ApiProperty({ example: 'free' })
  @IsOptional()
  subscription?: Subscription;
}
