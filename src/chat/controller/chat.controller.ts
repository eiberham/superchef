import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AgentUseCase } from '../application/agent.usecase';
import { ChatDto } from './dto/chat-dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly agent: AgentUseCase) {}

    @Post()
    @ApiBody({ type: ChatDto })
    async chat(@Body(ValidationPipe) chat: ChatDto): Promise<string> {
        return this.agent.call(chat.message)
    }
}