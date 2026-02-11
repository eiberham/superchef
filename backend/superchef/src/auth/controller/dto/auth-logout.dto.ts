import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLogoutDto {
  @ApiProperty({ example: 'user-uuid-1234' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'device-id-1234' })
  @IsString()
  deviceId: string;
}
