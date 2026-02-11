import { TestBed, type Mocked } from '@suites/unit';
import { DeleteRecipeUsecase } from '../delete-recipe.usecase';
import type { RecipeRepository } from '../../domain/recipe.interface';

describe('DeleteRecipeUseCase', () => {
  let deleteRecipeUseCase: DeleteRecipeUsecase;
  let recipeRepository: Mocked<RecipeRepository>;

  beforeAll(async () => {
    const mockRepo = {
      delete: jest.fn(),
    };

    const { unit } = await TestBed.solitary(DeleteRecipeUsecase)
      .mock('RECIPE_REPOSITORY')
      .final(mockRepo)
      .compile();

    deleteRecipeUseCase = unit;
    recipeRepository = mockRepo as Mocked<RecipeRepository>;
  });

  it('should delete a recipe by id', async () => {
    const recipeId = 1;
    recipeRepository.delete.mockResolvedValue();

    const result = await deleteRecipeUseCase.deleteRecipe(recipeId);

    expect(recipeRepository.delete).toHaveBeenCalledWith(recipeId);
  });
});
