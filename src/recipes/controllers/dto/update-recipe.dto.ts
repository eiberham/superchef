import { IsNotEmpty, IsArray } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { RecipeIngredient } from "./recipe-ingredient.dto";

export class UpdateRecipeDto {
    @ApiProperty({ example: 'Spaghetti Bolognese' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'A classic Italian pasta dish with rich meat sauce.' })
    description: string;

    @ApiProperty({ example: '1. Cook pasta. 2. Prepare sauce. 3. Combine and serve.' })
    steps: string;

    @ApiProperty({ example: 'http://example.com/image.jpg' })
    imageUrl: string;
    
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ example: [{
        ingredientId: 1,
        quantity: 2,
        unit: 'slices'
    }] })
    @IsArray()
    @IsNotEmpty()
    ingredients?: RecipeIngredient[] | undefined;
}