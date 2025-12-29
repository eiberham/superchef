import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CreateUserUsecase } from './application/create-user.usecase';
import { UpdateUserUsecase } from './application/update-user.usecase';
import { ListUsersUsecase } from './application/list-users.usecase';
import { GetUserUsecase } from './application/get-user.usecase';
import { DeleteUserUsecase } from './application/delete-user.usecase';
import { UserRepositoryImpl } from './infraestructure/prisma-user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQProducer } from 'src/rabbitmq/rabbitmq.producer';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
    controllers: [UserController],
    providers: [
        JwtService,
        CreateUserUsecase,
        UpdateUserUsecase,
        ListUsersUsecase,
        GetUserUsecase,
        DeleteUserUsecase,
        PrismaService,
        RabbitMQProducer,
        RabbitMQService,
        AuthGuard,
        {
            provide: 'USER_REPOSITORY',
            useClass: UserRepositoryImpl,
        }
    ]
})
export class UserModule{}