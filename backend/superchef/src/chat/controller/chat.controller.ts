import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AgentUseCase } from '../application/agent.usecase';
import { PromptDto } from './dto/prompt-dto';
import { Roles } from 'backend/superchef/src/auth/decorators/roles.decorator';
import { Role } from 'backend/superchef/src/auth/domain/role.enum';
import { RolesGuard } from 'backend/superchef/src/auth/guards/roles.guard';
import { AuthGuard } from 'backend/superchef/src/auth/guards/auth.guard';
import { Observable, from, map } from 'rxjs';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly agent: AgentUseCase) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiBody({ type: PromptDto })
  @Sse('recipe-stream')
  async chat(@Body(ValidationPipe) prompt: PromptDto): Promise<Observable<MessageEvent>> {
    return from(this.agent.call(prompt.message)).pipe(
      map((chunk): MessageEvent => ({
        data: { text: chunk }
      }))
    );
  }
}
