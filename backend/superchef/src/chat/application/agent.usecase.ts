import { Injectable, Inject } from '@nestjs/common'
import { createAgent } from 'langchain'
import { InMemoryStore } from '@langchain/langgraph'
import { GetRecipeByUsecase } from '../../recipes/application/get-recipe-by.usecase'
import { createRecipeLookupTool } from '../infrastructure/tools/recipe-lookup.tool'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class AgentUseCase {
  agent: any;

  constructor(
    private readonly recipe: GetRecipeByUsecase,
    @Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka,
  ) {
    this.agent = createAgent({
      model: 'openai:gpt-4o',
      tools: [createRecipeLookupTool(this.recipe)],
      store: new InMemoryStore(),
      systemPrompt: `
                You are a helpful chef assistant. Be concise and accurate.
                You can only answer questions using information obtained
                from tools you have access to. If no tool is relevant, you
                must refuse to answer.
            `,
    })
  }

  async *call(message: string): AsyncGenerator<string> {
    const stream = await this.agent.stream({
      messages: [{ role: 'user', content: message }],
    })

    for await (const chunk of stream) {

      if (chunk?.tools?.messages && chunk.tools.messages.length > 0) {
        const toolmsg = chunk.tools.messages[0]
        const content = JSON.parse(toolmsg.content)
        const recipe = { id: content.id, name: content.name }

        this.kafka.emit('recipe.improvement', {
          recipe,
          timestamp: Date.now()
        })
      }

      yield chunk.content
    }
  }
}
