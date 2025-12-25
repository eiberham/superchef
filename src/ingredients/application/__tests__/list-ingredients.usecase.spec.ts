import { TestBed, type Mocked } from '@suites/unit';
import { ListIngredientsUsecase } from '../list-ingredients.usecase';
import type { IngredientRepository } from '../../domain/ingredient.interface';

describe('ListIngredientUseCase', () => {
    let listIngredientsUseCase: ListIngredientsUsecase;
    let ingredientRepository: Mocked<IngredientRepository>;
    
    beforeAll(async () => {
        const mockRepo = {
            findAll: jest.fn()
        };

        const { unit } = await TestBed.solitary(ListIngredientsUsecase)
            .mock('INGREDIENT_REPOSITORY')
            .final(mockRepo)
            .compile();
        
        listIngredientsUseCase = unit;
        ingredientRepository = mockRepo as Mocked<IngredientRepository>;
    });

    it('should get a list of ingredients', async () => {
        const ingredients = [
            { id: 1, name: 'Sugar' },
            { id: 2, name: 'Salt' }
        ];
        ingredientRepository.findAll.mockResolvedValue(ingredients);

        const result = await listIngredientsUseCase.findAll();

        expect(ingredientRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(ingredients);
    });
})