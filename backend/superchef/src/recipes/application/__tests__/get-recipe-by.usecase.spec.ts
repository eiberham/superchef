import { TestBed, type Mocked } from '@suites/unit';
import { GetRecipeByUsecase } from '../get-recipe-by.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('GetRecipeByUseCase', () => {
  let getRecipeByUseCase: GetRecipeByUsecase;
  let recipeRepository: Mocked<RecipeRepository>;

  beforeAll(async () => {
    const mockRepo = {
      findByName: jest.fn(),
    };

    const { unit } = await TestBed.solitary(GetRecipeByUsecase)
      .mock('RECIPE_REPOSITORY')
      .final(mockRepo)
      .compile();

    getRecipeByUseCase = unit;
    recipeRepository = mockRepo as Mocked<RecipeRepository>;
  });

  it('should get a recipe by id', async () => {
    const recipe = {
      id: 1,
      name: 'Pancakes',
      description: 'Delicious fluffy pancakes',
      steps: 'Mix ingredients and cook on a griddle.',
      imageUrl: 'http://example.com/pancakes.jpg',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    recipeRepository.findBy.mockResolvedValue(recipe);

    const result = await getRecipeByUseCase.getRecipeBy({ name: recipe.name });

    expect(recipeRepository.findBy).toHaveBeenCalledWith({ name: recipe.name });
    expect(result).toEqual(recipe);
  });
});
