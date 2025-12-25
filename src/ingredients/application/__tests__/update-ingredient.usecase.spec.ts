import { TestBed, type Mocked } from '@suites/unit';
import { UpdateIngredientUsecase } from '../update-ingredient.usecase';
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('UpdateIngredientUseCase', () => {
    let updateIngredientUseCase: UpdateIngredientUsecase;
    let ingredientRepository: Mocked<IngredientRepository>;

    beforeAll(async () => {
        const mockRepo = {
            update: jest.fn()
        };

        const { unit } = await TestBed.solitary(UpdateIngredientUsecase)
            .mock('INGREDIENT_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        updateIngredientUseCase = unit;
        ingredientRepository = mockRepo as Mocked<IngredientRepository>;
    });

    it('should update an ingredient', async () => {
        const ingredient = { id: 2, name: 'Salt' };
        ingredientRepository.update.mockResolvedValue(ingredient);

        const result = await updateIngredientUseCase.update(2,ingredient);
        expect(ingredientRepository.update).toHaveBeenCalledWith(2, ingredient);
        expect(result).toEqual(ingredient);
    });
})