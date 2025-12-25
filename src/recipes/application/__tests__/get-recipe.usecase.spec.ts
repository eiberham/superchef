import { TestBed, type Mocked } from '@suites/unit';
import { GetRecipeUsecase } from '../get-recipe.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('GetRecipeUseCase', () => {
    let getRecipeUseCase: GetRecipeUsecase;
    let recipeRepository: Mocked<RecipeRepository>;
    
    beforeAll(async () => {
        const mockRepo = {
            findById: jest.fn()
        };

        const { unit } = await TestBed.solitary(GetRecipeUsecase)
            .mock('RECIPE_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        getRecipeUseCase = unit;
        recipeRepository = mockRepo as Mocked<RecipeRepository>;
    });

    it('should get a recipe by id', async () => {
        const recipe = { id : 1,
            name: 'Pancakes',
            description: 'Delicious fluffy pancakes',
            steps: 'Mix ingredients and cook on a griddle.',
            imageUrl : 'http://example.com/pancakes.jpg',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        recipeRepository.findById.mockResolvedValue(recipe);

        const result = await getRecipeUseCase.getRecipeById(recipe.id);

        expect(recipeRepository.findById).toHaveBeenCalledWith(recipe.id);
        expect(result).toEqual(recipe);
    });
})