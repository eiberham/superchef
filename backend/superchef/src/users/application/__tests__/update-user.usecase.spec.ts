import { TestBed, type Mocked } from '@suites/unit';
import { UpdateUserUsecase } from '../update-user.usecase';
import type { UserRepository } from 'backend/superchef/src/users/domain/user.interface';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUsecase;
  let userRepository: Mocked<UserRepository>;

  beforeAll(async () => {
    const mockRepo = {
      update: jest.fn(),
    };

    const { unit } = await TestBed.solitary(UpdateUserUsecase)
      .mock('USER_REPOSITORY')
      .final(mockRepo)
      .compile();

    updateUserUseCase = unit;
    userRepository = mockRepo as Mocked<UserRepository>;
  });

  it('should update a user', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.update.mockResolvedValue(user);

    const result = await updateUserUseCase.updateUser(user.id, user);

    expect(userRepository.update).toHaveBeenCalledWith(user.id, user);
    expect(result).toEqual(user);
  });
});
