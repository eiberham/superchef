import { TestBed, type Mocked } from '@suites/unit';
import { DeleteIngredientUsecase } from '../delete-ingredient.usecase';
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('DeleteIngredientUseCase', () => {
    let deleteIngredientUseCase: DeleteIngredientUsecase;
    let ingredientRepository: Mocked<IngredientRepository>;
    
    beforeAll(async () => {
        const mockRepo = {
            delete: jest.fn()
        };

        const { unit } = await TestBed.solitary(DeleteIngredientUsecase)
            .mock('INGREDIENT_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        deleteIngredientUseCase = unit;
        ingredientRepository = mockRepo as Mocked<IngredientRepository>;
    });

    it('should delete an ingredient', async () => {
        ingredientRepository.delete.mockResolvedValue();

        await deleteIngredientUseCase.delete(1);

        expect(ingredientRepository.delete).toHaveBeenCalledWith(1);
    });
})