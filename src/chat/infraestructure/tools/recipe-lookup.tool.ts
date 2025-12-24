import { tool } from "langchain";
import { GetRecipeByNameUsecase } from "src/recipes/application/get-recipe-by-name.usecase";


export function createRecipeLookupTool(getRecipeByNameUsecase: GetRecipeByNameUsecase) {
  return tool(
    async (input) => {
      return await getRecipeByNameUsecase.getRecipeByName(input);
    },
    {
      name: "recipe_lookup",
      description: "Use this tool to look up recipes by name. Input should be the name of the recipe you want to find.",
    }
  );
}