export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  deviceId: string;
  expiresAt: Date;
  deviceType?: string | null;
  deviceName?: string | null;
  createdAt: Date;
}

export type CreateRefreshToken = Omit<
  RefreshToken,
  'id' | 'deviceType' | 'deviceName'
> &
  Partial<Pick<RefreshToken, 'deviceType' | 'deviceName'>>;
export type UpdateRefreshToken = Partial<
  Pick<RefreshToken, 'deviceType' | 'deviceName' | 'id'>
> &
  Omit<RefreshToken, 'deviceType' | 'deviceName' | 'id'>;

export interface RefreshTokenRepository {
  upsert(
    userId: string,
    refreshToken: CreateRefreshToken,
  ): Promise<RefreshToken>;
  find(userId: string, deviceId: string): Promise<RefreshToken | null>;
  delete(userId: string, deviceId: string): Promise<void>;
}
