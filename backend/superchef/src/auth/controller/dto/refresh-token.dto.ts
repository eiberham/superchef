import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'user-id-1234' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'device-id-1234' })
  @IsString()
  deviceId: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  refreshToken: string;
}
