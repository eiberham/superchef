import { TestBed, type Mocked } from '@suites/unit';
import { GetIngredientUsecase } from '../get-ingredient.usecase'; 
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('GetIngredientUseCase', () => {
    let getIngredientUseCase: GetIngredientUsecase;
    let ingredientRepository: Mocked<IngredientRepository>;
    
    beforeAll(async () => {
        const mockRepo = {
            findById: jest.fn()
        };

        const { unit } = await TestBed.solitary(GetIngredientUsecase)
            .mock('INGREDIENT_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        getIngredientUseCase = unit;
        ingredientRepository = mockRepo as Mocked<IngredientRepository>;
    });

    it('should get an ingredient by id', async () => {
        const ingredient = { id: 1, name: 'Sugar' };
        ingredientRepository.findById.mockResolvedValue(ingredient);

        const result = await getIngredientUseCase.findById(ingredient.id);

        expect(ingredientRepository.findById).toHaveBeenCalledWith(ingredient.id);
        expect(result).toEqual(ingredient);
    });
})