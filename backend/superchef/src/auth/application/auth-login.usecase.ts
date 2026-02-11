import bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { AuthTokens } from '../domain/auth.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { GetUserByUsecase } from 'backend/superchef/src/users/application/get-user-by.usecase';
import { AuthTokenGenerator } from '../infrastructure/auth.token.generator';
import { RefreshTokenUsecase } from './refresh-token.usecase';

@Injectable()
export class AuthLoginUsecase extends AuthTokenGenerator {
  private logger = new Logger(AuthLoginUsecase.name, { timestamp: true });

  constructor(
    private readonly user: GetUserByUsecase,
    private readonly token: RefreshTokenUsecase,
    public readonly config: ConfigService,
    public readonly jwt: JwtService,
  ) {
    super(config, jwt);
  }

  async handle(
    email: string,
    password: string,
    deviceId: string,
    deviceName: string | undefined,
    deviceType: string | undefined,
  ): Promise<AuthTokens> {
    const user = await this.user.findBy({ email });
    const roles = user?.roles?.map((role) => role) || [];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      roles,
    );
    const decoded = this.jwt.decode(refreshToken);
    const expiration = decoded?.exp;
    const hashed = await bcrypt.hash(refreshToken, 10);

    const record = {
      userId: user.id,
      token: hashed,
      expiresAt: new Date(expiration * 1000),
      deviceId: deviceId,
      deviceName: deviceName,
      deviceType: deviceType,
      createdAt: new Date(),
    };

    await this.token.create(user.id, record);
    this.logger.log(`User logged in: ${email}, Device ID: ${deviceId}`);
    return {
      accessToken,
      refreshToken,
    };
  }
}
