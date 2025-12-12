import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
    @ApiProperty({ example: 'Tomato' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
