export class RecipeResponseDto {
    id: number;
    name: string;
    description: string | null;
    steps: string;
    imageUrl: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}