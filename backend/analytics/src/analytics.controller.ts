import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';
import { RedisService } from './redis/redis.service';

@Controller()
export class AnalyticsController {
  private readonly logger = new Logger(AnalyticsController.name)

  constructor(
    private readonly redis: RedisService
  ) {}

  // Fire and forget
  @EventPattern('recipe.improvement')
  async handle(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const originalMessage = context.getMessage()
    const partition = context.getPartition()

    const { id , name }  = message.recipe
    
    // 1. Increment the improvement count for the recipe
    await this.redis.hincrby('recipe_improvements_counts', id, 1)
  
    // 2. (Optional) Save the name so the ranking is readable
    await this.redis.hset('recipe_names', id, name)

    this.logger.log(`Stat updated for recipe ${id}: +1`)
  }

  // Wait for response
  @MessagePattern('get.top.recipes')
  async getTopRecipes(){
    const stats = await this.redis.hgetall('recipe_improvements_counts')

    return Object.entries(stats)
      .map(([id, count]) => ({ id, count: parseInt(count, 10) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }
}
