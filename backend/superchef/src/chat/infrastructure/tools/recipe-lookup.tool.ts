import { tool } from 'langchain';
import { GetRecipeByUsecase } from 'backend/superchef/src/recipes/application/get-recipe-by.usecase';

export function createRecipeLookupTool(recipe: GetRecipeByUsecase) {
  return tool(
    async (input) => {
      return await recipe.getRecipeBy({ name: input });
    },
    {
      name: 'recipe_lookup',
      description:
        'Use this tool to look up recipes by name. Input should be the name of the recipe you want to find.',
    },
  );
}
