import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { GetUserByUsecase } from '../users/application/get-user-by.usecase';
import { AuthLoginUsecase } from './application/auth-login.usecase';
import { AuthLogoutUsecase } from './application/auth-logout.usecase';
import { RefreshTokenUsecase } from './application/refresh-token.usecase';
import { UserRepositoryImpl } from '../users/infrastructure/prisma-user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaRefreshTokenRepository } from './infrastructure/prisma-refresh-token.repository';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    GetUserByUsecase,
    AuthLoginUsecase,
    AuthLogoutUsecase,
    RefreshTokenUsecase,
    PrismaService,
    {
      provide: 'REFRESH_TOKEN_REPOSITORY',
      useClass: PrismaRefreshTokenRepository,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [],
})
export class AuthModule {}
