import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChatDto {
    @IsString()
    @ApiProperty({ description: 'The message to be processed by the chat agent.' })
    message: string;
}