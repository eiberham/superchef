import { IsNumber, IsString } from 'class-validator';

export class RecipeIngredient {
  @IsNumber()
  ingredientId: string;

  @IsNumber()
  quantity: number | null;

  @IsString()
  unit: string | null;
}
