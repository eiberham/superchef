import { TestBed, type Mocked } from '@suites/unit';
import { CreateIngredientUsecase } from '../create-ingredient.usecase';
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('CreateIngredientUseCase', () => {
  let createIngredientUseCase: CreateIngredientUsecase;
  let ingredientRepository: Mocked<IngredientRepository>;

  beforeAll(async () => {
    const mockRepo = {
      create: jest.fn(),
    };

    const { unit } = await TestBed.solitary(CreateIngredientUsecase)
      .mock('INGREDIENT_REPOSITORY')
      .final(mockRepo)
      .compile();

    createIngredientUseCase = unit;
    ingredientRepository = mockRepo as Mocked<IngredientRepository>;
  });

  it('should create an ingredient', async () => {
    const ingredient = { id: 1, name: 'Sugar' };
    ingredientRepository.create.mockResolvedValue(ingredient);

    const result = await createIngredientUseCase.create(ingredient);

    expect(ingredientRepository.create).toHaveBeenCalledWith(ingredient);
    expect(result).toEqual(ingredient);
  });
});
