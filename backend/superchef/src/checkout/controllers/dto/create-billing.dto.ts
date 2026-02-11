import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBillingDto {
  @ApiProperty({ example: 'price_12345' })
  @IsString()
  @IsNotEmpty()
  priceId: string;
}
