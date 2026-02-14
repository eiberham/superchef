import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './controllers/notifications.controller';
import { SendMailUsecase } from './application/send-mail.usecase';
import { EmailService } from './infrastructure/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname + '/../../../backend/notifications/.env'],
    }),
  ],
  controllers: [NotificationsController],
  providers: [SendMailUsecase, EmailService, ConfigService],
})
export class NotificationsModule {}
