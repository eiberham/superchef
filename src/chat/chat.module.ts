import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatController } from './controller/chat.controller';
import { AgentUseCase } from './application/agent.usecase';
import { RecipeRepositoryImpl } from 'src/recipes/infraestructure/prisma-recipe.repository';
import { GetRecipeByNameUsecase } from 'src/recipes/application/get-recipe-by-name.usecase';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [ChatController],
    providers: [
        JwtService,
        PrismaService,
        {
            provide: 'RECIPE_REPOSITORY',
            useClass: RecipeRepositoryImpl,
        },
        AgentUseCase,
        GetRecipeByNameUsecase
    ]
})
export class ChatModule{}