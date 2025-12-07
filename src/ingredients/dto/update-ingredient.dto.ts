import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateIngredientDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}