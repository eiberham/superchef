import { Injectable } from '@nestjs/common';
import {
  RefreshTokenRepository,
  RefreshToken,
  CreateRefreshToken,
} from '../domain/refresh-token.interface';
import { PrismaService } from 'backend/superchef/src/prisma/prisma.service';

@Injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(
    userId: string,
    data: CreateRefreshToken,
  ): Promise<RefreshToken> {
    const refreshToken = await this.prisma.refreshToken.upsert({
      where: {
        userId_deviceId: {
          userId,
          deviceId: data.deviceId,
        },
      },
      update: {
        token: data.token,
        expiresAt: data.expiresAt,
        deviceName: data.deviceName ?? null,
        deviceType: data.deviceType ?? null,
      },
      create: {
        userId,
        token: data.token,
        expiresAt: data.expiresAt,
        deviceId: data.deviceId,
        deviceName: data.deviceName ?? null,
        deviceType: data.deviceType ?? null,
      },
    });

    return {
      ...refreshToken,
      deviceType: refreshToken.deviceType ?? null,
      deviceName: refreshToken.deviceName ?? null,
    };
  }

  async find(userId: string, deviceId: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({
      where: {
        userId_deviceId: {
          userId,
          deviceId: deviceId,
        },
      },
    });
  }

  async delete(userId: string, deviceId: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        userId_deviceId: {
          userId,
          deviceId: deviceId,
        },
      },
    });
  }
}
