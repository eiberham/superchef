import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthLogoutDto } from './dto/auth-logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthTokens } from '../domain/auth.interface';
import { AuthGuard } from 'backend/superchef/src/auth/guards/auth.guard';
import { RolesGuard } from 'backend/superchef/src/auth/guards/roles.guard';
import { RefreshTokenUsecase } from '../application/refresh-token.usecase';
import { AuthLoginUsecase } from '../application/auth-login.usecase';
import { AuthLogoutUsecase } from '../application/auth-logout.usecase';
import { Role } from '../domain/role.enum';
import { Roles } from '../decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: AuthLoginUsecase,
    private readonly logout: AuthLogoutUsecase,
    private readonly token: RefreshTokenUsecase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  async signIn(@Body() data: AuthLoginDto): Promise<AuthTokens> {
    const { email, password, deviceId, deviceName, deviceType } = data;
    const { accessToken, refreshToken } = await this.login.handle(
      email,
      password,
      deviceId,
      deviceName,
      deviceType,
    );
    return { accessToken, refreshToken };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VIEWER)
  @ApiBearerAuth()
  @Post('refresh')
  @ApiBody({ type: RefreshTokenDto })
  async refresh(@Body() data: RefreshTokenDto): Promise<AuthTokens> {
    const { accessToken, refreshToken } = await this.token.update(
      data.userId,
      data.deviceId,
      data.refreshToken,
    );
    return { accessToken, refreshToken };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.VIEWER)
  @ApiBearerAuth()
  @Post('logout')
  @ApiBody({ type: AuthLogoutDto })
  async signOut(@Body() data: AuthLogoutDto): Promise<void> {
    return this.logout.handle(data.userId, data.deviceId);
  }
}
