import { TestBed, type Mocked } from '@suites/unit';
import { ListRecipesUsecase } from '../list-recipes.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('ListRecipesUseCase', () => {
    let listRecipesUseCase: ListRecipesUsecase;
    let recipeRepository: Mocked<RecipeRepository>;
    
    beforeAll(async () => {
        const mockRepo = {
            findAll: jest.fn()
        };

        const { unit } = await TestBed.solitary(ListRecipesUsecase)
            .mock('RECIPE_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        listRecipesUseCase = unit;
        recipeRepository = mockRepo as Mocked<RecipeRepository>;
    });

    it('should list all recipes', async () => {
        const recipes = [
            { id : 1,
              name: 'Pancakes',
              description: 'Delicious fluffy pancakes',
              steps: 'Mix ingredients and cook on a griddle.',
              imageUrl : 'http://example.com/pancakes.jpg',
              userId: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            { id : 2,
              name: 'Omelette',
              description: 'Simple cheese omelette',
              steps: 'Beat eggs, add cheese, and cook in a pan.',
              imageUrl : 'http://example.com/omelette.jpg',
              userId: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            }
        ];
        recipeRepository.findAll.mockResolvedValue(recipes);

        const result = await listRecipesUseCase.getRecipes();

        expect(recipeRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(recipes);
    });
})                                 