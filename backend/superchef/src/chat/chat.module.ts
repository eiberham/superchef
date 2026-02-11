import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatController } from './controller/chat.controller';
import { AgentUseCase } from './application/agent.usecase';
import { RecipeRepositoryImpl } from 'backend/superchef/src/recipes/infrastructure/prisma-recipe.repository';
import { GetRecipeByUsecase } from 'backend/superchef/src/recipes/application/get-recipe-by.usecase';
import { JwtService } from '@nestjs/jwt';
import { KafkaModule } from '../kafka.module';

@Module({
  imports: [
    KafkaModule
  ],
  controllers: [ChatController],
  providers: [
    JwtService,
    PrismaService,
    {
      provide: 'RECIPE_REPOSITORY',
      useClass: RecipeRepositoryImpl,
    },
    AgentUseCase,
    GetRecipeByUsecase,
  ],
})
export class ChatModule {}
