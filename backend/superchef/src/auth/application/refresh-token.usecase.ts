import bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import type {
  RefreshTokenRepository,
  CreateRefreshToken,
} from '../domain/refresh-token.interface';
import { AuthTokenGenerator } from '../infrastructure/auth.token.generator';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GetUserByUsecase } from 'backend/superchef/src/users/application/get-user-by.usecase';
import { AuthTokens } from '../domain/auth.interface';
import { RefreshToken } from 'generated/prisma';

@Injectable()
export class RefreshTokenUsecase extends AuthTokenGenerator {
  constructor(
    @Inject('REFRESH_TOKEN_REPOSITORY')
    private readonly token: RefreshTokenRepository,

    private readonly user: GetUserByUsecase,
    public readonly config: ConfigService,
    public readonly jwt: JwtService,
  ) {
    super(config, jwt);
  }

  async create(
    userId: string,
    data: CreateRefreshToken,
  ): Promise<RefreshToken> {
    const user = await this.user.findBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const token = await this.token.upsert(userId, data);
    return {
      ...token,
      deviceType: data.deviceType ?? null,
      deviceName: data.deviceName ?? null,
    };
  }

  async update(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<AuthTokens> {
    const user = await this.user.findBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const refresh = await this.token.find(userId, deviceId);
    if (!refresh) {
      throw new UnauthorizedException('Refresh token not found');
    }

    if ((await bcrypt.compare(token, refresh.token)) === false) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const roles = user?.roles?.map((role) => role) || [];

    const { accessToken, refreshToken } = await this.generateTokens(
      userId,
      user.email,
      roles,
    );

    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.token.upsert(userId, { ...refresh, token: hashed });

    return { accessToken, refreshToken };
  }

  async delete(userId: string, deviceId: string): Promise<void> {
    await this.token.delete(userId, deviceId);
  }
}
