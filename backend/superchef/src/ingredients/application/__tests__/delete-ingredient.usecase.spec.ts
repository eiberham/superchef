import { TestBed, type Mocked } from '@suites/unit';
import { DeleteIngredientUsecase } from '../delete-ingredient.usecase';
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('DeleteIngredientUseCase', () => {
  let deleteIngredientUseCase: DeleteIngredientUsecase;
  let ingredientRepository: Mocked<IngredientRepository>;

  beforeAll(async () => {
    const mockRepo = {
      delete: jest.fn(),
    };

    const { unit } = await TestBed.solitary(DeleteIngredientUsecase)
      .mock('INGREDIENT_REPOSITORY')
      .final(mockRepo)
      .compile();

    deleteIngredientUseCase = unit;
    ingredientRepository = mockRepo as Mocked<IngredientRepository>;
  });

  it('should delete an ingredient', async () => {
    const ingredient = { id: 1, name: 'Sugar' };
    ingredientRepository.delete.mockResolvedValue(ingredient);

    await deleteIngredientUseCase.delete(ingredient.id);

    expect(ingredientRepository.delete).toHaveBeenCalledWith(ingredient.id);
  });
});
