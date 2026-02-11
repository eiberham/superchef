import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanDto {
  @ApiProperty({ example: 'basic' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'price_1Hh1YZ2eZvKYlo2C0q1Z1Z1Z' })
  @IsOptional()
  @IsString()
  stripePriceId?: string | null;

  @ApiProperty({ example: {} })
  @IsObject()
  features: any;

  @ApiProperty({ example: 'usd' })
  @IsString()
  currency: string;
}
