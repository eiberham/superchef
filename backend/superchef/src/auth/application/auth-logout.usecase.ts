import { Injectable } from '@nestjs/common';
import { RefreshTokenUsecase } from './refresh-token.usecase';

@Injectable()
export class AuthLogoutUsecase {
  constructor(private readonly token: RefreshTokenUsecase) {}
  async handle(userId: string, token: string): Promise<void> {
    return this.token.delete(userId, token);
  }
}
