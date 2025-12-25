import { Injectable } from '@nestjs/common';
import { createAgent } from "langchain";
import { InMemoryStore } from "@langchain/langgraph";
import { GetRecipeByNameUsecase } from '../../recipes/application/get-recipe-by-name.usecase';
import { createRecipeLookupTool } from '../infraestructure/tools/recipe-lookup.tool';

@Injectable()
export class AgentUseCase {
    agent: any;

    constructor(
        private readonly getRecipeByNameUsecase: GetRecipeByNameUsecase
    ){
        this.agent = createAgent({
            model: "openai:gpt-4o",
            tools: [createRecipeLookupTool(this.getRecipeByNameUsecase)],
            store: new InMemoryStore(),
            systemPrompt: `
                You are a helpful chef assistant. Be concise and accurate.
                You can only answer questions using information obtained
                from tools you have access to. If no tool is relevant, you
                must refuse to answer.
            `,
        });
    }

    async call(message: string): Promise<string> {
        const response = await this.agent.invoke({
            messages: [{ role: "user", content: message }],
        })
        return response;
    }
}
