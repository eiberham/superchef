import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIngredientDto {
    @ApiProperty({ example: 'Tomato' })
    @IsString()
    @IsNotEmpty()
    name: string;
}