import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqController } from './controllers/rabbitmq.controller';
import { SendMailUsecase } from './application/send-mail.usecase';
import { EmailService } from './infrastructure/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname + '/../../../backend/rabbitmq/.env'],
    }),
  ],
  controllers: [RabbitmqController],
  providers: [SendMailUsecase, EmailService, ConfigService],
})
export class RabbitmqModule {}
