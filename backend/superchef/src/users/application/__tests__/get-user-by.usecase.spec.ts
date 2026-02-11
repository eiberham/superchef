import { TestBed, type Mocked } from '@suites/unit';
import { GetUserByUsecase } from '../get-user-by.usecase';
import type { UserRepository } from 'backend/superchef/src/users/domain/user.interface';

describe('GetUserByUseCase', () => {
  let getUserByUsecase: GetUserByUsecase;
  let userRepository: Mocked<UserRepository>;

  beforeAll(async () => {
    const mockRepo = {
      findBy: jest.fn(),
    };

    const { unit } = await TestBed.solitary(GetUserByUsecase)
      .mock('USER_REPOSITORY')
      .final(mockRepo)
      .compile();

    getUserByUsecase = unit;
    userRepository = mockRepo as Mocked<UserRepository>;
  });

  it('should get a user by email', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.findByEmail.mockResolvedValue(user);

    const result = await getUserByUsecase.findBy({ email: user.email });

    expect(userRepository.findBy).toHaveBeenCalledWith({
      email: 'john.doe@example.com',
    });
    expect(result).toEqual(user);
  });
});
