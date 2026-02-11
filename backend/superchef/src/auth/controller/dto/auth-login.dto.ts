import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'device-id-1234' })
  @IsString()
  deviceId: string;

  @ApiProperty({ example: 'iPhone 12', required: false })
  @IsOptional()
  deviceType?: string;

  @ApiProperty({ example: 'My iPhone', required: false })
  @IsOptional()
  deviceName?: string;
}
