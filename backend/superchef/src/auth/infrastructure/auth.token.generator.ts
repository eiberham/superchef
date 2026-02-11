import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthTokens } from '../domain/auth.interface';

export class AuthTokenGenerator {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly jwtService: JwtService,
  ) {}
  async generateTokens(
    userId: string,
    email: string,
    roles: string[],
  ): Promise<AuthTokens> {
    const payload = { sub: userId, email, roles };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
