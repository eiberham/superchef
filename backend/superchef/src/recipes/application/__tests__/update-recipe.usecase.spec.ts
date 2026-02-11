import { TestBed, type Mocked } from '@suites/unit';
import { UpdateRecipeUsecase } from '../update-recipe.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('UpdateRecipeUseCase', () => {
  let updateRecipeUsecase: UpdateRecipeUsecase;
  let recipeRepository: Mocked<RecipeRepository>;

  beforeAll(async () => {
    const mockRepo = {
      update: jest.fn(),
    };

    const { unit } = await TestBed.solitary(UpdateRecipeUsecase)
      .mock('RECIPE_REPOSITORY')
      .final(mockRepo)
      .compile();

    updateRecipeUsecase = unit;
    recipeRepository = mockRepo as Mocked<RecipeRepository>;
  });

  it('should update a recipe', async () => {
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
    recipeRepository.update.mockResolvedValue(recipe);

    const result = await updateRecipeUsecase.updateRecipe(recipe.id, recipe);

    expect(recipeRepository.update).toHaveBeenCalledWith(recipe.id, recipe);
    expect(result).toEqual(recipe);
  });
});
