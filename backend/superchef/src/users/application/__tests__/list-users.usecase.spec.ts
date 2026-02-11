import { TestBed, type Mocked } from '@suites/unit';
import { ListUsersUsecase } from '../list-users.usecase';
import type { UserRepository } from 'backend/superchef/src/users/domain/user.interface';

describe('ListUsersUseCase', () => {
  let listUsersUsecase: ListUsersUsecase;
  let userRepository: Mocked<UserRepository>;

  beforeAll(async () => {
    const mockRepo = {
      findAll: jest.fn(),
    };

    const { unit } = await TestBed.solitary(ListUsersUsecase)
      .mock('USER_REPOSITORY')
      .final(mockRepo)
      .compile();

    listUsersUsecase = unit;
    userRepository = mockRepo as Mocked<UserRepository>;
  });

  it('should list all users', async () => {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    userRepository.findAll.mockResolvedValue(users);

    const result = await listUsersUsecase.getUsers();

    expect(userRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
