import { Prisma } from 'generated/prisma/edge';

export interface Ingredient {
  id: string;
  name: string;
}

export type CreateIngredientData = Omit<Ingredient, 'id'>;
export type UpdateIngredientData = Partial<Omit<Ingredient, 'id'>>;

export interface IngredientRepository {
  findAll(): Promise<Ingredient[]>;
  findById(id: string): Promise<Ingredient | null>;
  findBy<T extends Prisma.IngredientWhereInput>(
    query: T,
  ): Promise<Ingredient | null>;
  create(ingredient: Partial<Ingredient>): Promise<Ingredient>;
  update(id: string, ingredient: Partial<Ingredient>): Promise<Ingredient>;
  delete(id: string): Promise<Ingredient>;
}
