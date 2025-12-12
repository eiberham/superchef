import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from '../users/user.module';
import { UserService } from '../users/user.service';
import { UserRepositoryImpl } from '../users/repositories/user.repository.impl';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
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
