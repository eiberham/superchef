import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIngredientDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}
