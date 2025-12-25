import { TestBed, type Mocked } from '@suites/unit';
import { GetRecipeByNameUsecase } from '../get-recipe-by-name.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('GetRecipeByNameUseCase', () => {
    let getRecipeByNameUseCase: GetRecipeByNameUsecase;
    let recipeRepository: Mocked<RecipeRepository>;
    
    beforeAll(async () => {
        const mockRepo = {
            findByName: jest.fn()
        };

        const { unit } = await TestBed.solitary(GetRecipeByNameUsecase)
            .mock('RECIPE_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        getRecipeByNameUseCase = unit;
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
        recipeRepository.findByName.mockResolvedValue(recipe);

        const result = await getRecipeByNameUseCase.getRecipeByName(recipe.name);

        expect(recipeRepository.findByName).toHaveBeenCalledWith(recipe.name);
        expect(result).toEqual(recipe);
    });
})