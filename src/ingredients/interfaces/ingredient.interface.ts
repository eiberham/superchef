export interface Ingredient {
    id: number;
    name: string;
}

export interface IngredientRepository {
    findAll(): Promise<Ingredient[]>;
    findById(id: number): Promise<Ingredient | null>;
    create(ingredient: Partial<Ingredient>): Promise<Ingredient>;
    update(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient>;
    delete(id: number): Promise<void>;
}
