import { Prisma } from 'generated/prisma/edge';

export interface Recipe {
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

type RecipeIngredient = {
  ingredientId: string;
  quantity: number | null;
  unit: string | null;
};

export type CreateRecipeData = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRecipeData = Partial<
  Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface RecipeRepository {
  findAll(): Promise<Recipe[]>;
  findBy<T extends Prisma.RecipeWhereInput>(query: T): Promise<Recipe | null>;
  create(recipe: CreateRecipeData): Promise<Recipe>;
  update(id: string, recipe: UpdateRecipeData): Promise<Recipe>;
  delete(id: string): Promise<Recipe>;
}
