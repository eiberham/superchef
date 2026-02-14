import { TestBed, type Mocked } from '@suites/unit';
import { DeleteUserUsecase } from '../delete-user.usecase';
import type { UserRepository } from 'backend/superchef/src/users/domain/user.interface';

describe('DeleteUserUseCase', () => {
  let deleteUserUsecase: DeleteUserUsecase;
  let userRepository: Mocked<UserRepository>;

  beforeAll(async () => {
    const mockRepo = {
      delete: jest.fn(),
    };

    const { unit } = await TestBed.solitary(DeleteUserUsecase)
      .mock('USER_REPOSITORY')
      .final(mockRepo)
      .compile();

    deleteUserUsecase = unit;
    userRepository = mockRepo as unknown as Mocked<UserRepository>;
  });

  it('should delete a user', async () => {
    const user = {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.delete.mockResolvedValue(user);

    await deleteUserUsecase.deleteUser(user.id);

    expect(userRepository.delete).toHaveBeenCalledWith('1');
  });
});
