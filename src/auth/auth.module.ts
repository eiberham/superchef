import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { GetUserByEmailUsecase } from '../users/application/get-user-by-email.usecase';
import { UserRepositoryImpl } from '../users/infraestructure/prisma-user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from 'src/redis/redis.service';

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
    CacheService,
    GetUserByEmailUsecase,
    PrismaService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryImpl,
    },
    AuthService
  ],
  exports: [AuthService],
})
export class AuthModule {}
