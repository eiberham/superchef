import { TestBed, type Mocked } from '@suites/unit';
import { CreateUserUsecase } from '../create-user.usecase';
import type { UserRepository } from 'backend/superchef/src/users/domain/user.interface';

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
    userRepository = mockRepo as unknown as Mocked<UserRepository>;

    jest
      .spyOn(createUserUseCase, 'hashPassword')
      .mockResolvedValue('hashedpassword');
  });

  it('should create a user', async () => {
    const user = {
      id: '1',
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
  });
});
