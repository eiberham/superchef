import { RecipeIngredient } from './recipe-ingredient.dto';

export class RecipeResponseDto {
  id: string;
  name: string;
  description: string;
  steps: string;
  imageUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  ingredients?: RecipeIngredient[];
}
