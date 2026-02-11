import { TestBed, type Mocked } from '@suites/unit';
import { GetIngredientByUsecase } from '../get-ingredient-by.usecase';
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('GetIngredientUseCase', () => {
  let getIngredientUseCase: GetIngredientByUsecase;
  let ingredientRepository: Mocked<IngredientRepository>;

  beforeAll(async () => {
    const mockRepo = {
      findBy: jest.fn(),
    };

    const { unit } = await TestBed.solitary(GetIngredientByUsecase)
      .mock('INGREDIENT_REPOSITORY')
      .final(mockRepo)
      .compile();

    getIngredientUseCase = unit;
    ingredientRepository = mockRepo as Mocked<IngredientRepository>;
  });

  it('should get an ingredient by id', async () => {
    const ingredient = { id: 1, name: 'Sugar' };
    ingredientRepository.findBy.mockResolvedValue(ingredient);

    const result = await getIngredientUseCase.findBy({ id: ingredient.id });

    expect(ingredientRepository.findBy).toHaveBeenCalledWith({
      id: ingredient.id,
    });
    expect(result).toEqual(ingredient);
  });
});
