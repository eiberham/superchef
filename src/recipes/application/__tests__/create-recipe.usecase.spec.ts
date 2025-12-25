import { TestBed, type Mocked } from '@suites/unit';
import { CreateRecipeUsecase } from '../create-recipe.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('CreateRecipeUseCase', () => {
    let createRecipeUseCase: CreateRecipeUsecase;
    let recipeRepository: Mocked<RecipeRepository>;

    beforeAll(async () => {
        const mockRepo = {
            create: jest.fn()
        };

        const { unit } = await TestBed.solitary(CreateRecipeUsecase)
            .mock('RECIPE_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        createRecipeUseCase = unit;
        recipeRepository = mockRepo as Mocked<RecipeRepository>;
    });

    it('should create a recipe', async () => {
        const recipe = { 
            id : 1,
            name: 'Pancakes',
            description: 'Delicious fluffy pancakes',
            steps: 'Mix ingredients and cook on a griddle.',
            imageUrl : 'http://example.com/pancakes.jpg',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        recipeRepository.create.mockResolvedValue(recipe);

        const result = await createRecipeUseCase.createRecipe(recipe);

        expect(recipeRepository.create).toHaveBeenCalledWith(recipe);
        expect(result).toEqual(recipe);
    });
})