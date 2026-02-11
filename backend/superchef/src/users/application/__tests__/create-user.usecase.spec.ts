import { TestBed, type Mocked } from '@suites/unit';
import { CreateUserUsecase } from '../create-user.usecase';
import type { UserRepository } from 'backend/superchef/src/users/domain/user.interface';
import { RabbitMQProducer } from '../../../rabbitmq/rabbitmq.producer';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUsecase;
  let userRepository: Mocked<UserRepository>;

  beforeAll(async () => {
    const mockRepo = {
      create: jest.fn(),
    };

    const { unit } = await TestBed.solitary(CreateUserUsecase)
      .mock('USER_REPOSITORY')
      .final(mockRepo)
      .compile();

    createUserUseCase = unit;
    userRepository = mockRepo as Mocked<UserRepository>;

    const { unit: producer } =
      await TestBed.solitary(RabbitMQProducer).compile();

    (createUserUseCase as any).rabbitMQProducer = producer;

    jest
      .spyOn((createUserUseCase as any).rabbitMQProducer, 'sendToQueue')
      .mockResolvedValue(Promise.resolve());
    jest
      .spyOn(createUserUseCase, 'hashPassword')
      .mockResolvedValue('hashedpassword');
  });

  it('should create a user', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.create.mockResolvedValue(user);

    const result = await createUserUseCase.createUser(user);

    expect(userRepository.create).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
    expect(
      (createUserUseCase as any).rabbitMQProducer.sendToQueue,
    ).toHaveBeenCalledWith('email_queue', {
      id: user.id,
      email: user.email,
      name: user.name,
      subject: 'Welcome to superchef!',
      body: `
                    Thank you for registering at superchef. 
                    We are excited to have you on board! `,
    });
  });
});
