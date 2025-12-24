import { IsNumber, IsString } from "class-validator";

export class RecipeIngredient {
    @IsNumber()
    ingredientId: number;

    @IsNumber()
    quantity: number;

    @IsString()
    unit: string;
}