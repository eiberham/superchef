import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from '../auth.service'
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    @ApiBody({ type: AuthDto })
    async login(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
        const accessToken = await this.authService.login(authDto.email, authDto.password);
        return { accessToken };
    }
}
