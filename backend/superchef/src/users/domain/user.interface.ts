import { Prisma } from 'generated/prisma/edge';
import type { JsonValue } from 'generated/prisma/runtime/client';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
  subscription?: Subscription;
  preferences?: JsonValue;
  createdAt: Date;
  updatedAt: Date | null;
  roles?: string[];
}

const diet = {
  none: 'none',
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  omnivore: 'omnivore',
} as const;

type Diet = (typeof diet)[keyof typeof diet];

export interface UserPreferences {
  diet: Diet;
  allergies: string[];
}

export type Subscription = 'free' | 'basic';

export type UserResponseData = Omit<User, 'password'>;
export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserData = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface UserRepository {
  findAll(): Promise<UserResponseData[]>;
  findBy<T extends Prisma.UserWhereInput>(query: T): Promise<User | null>;
  create(user: Partial<CreateUserData>): Promise<UserResponseData>;
  update(id: string, user: UpdateUserData): Promise<UserResponseData>;
  delete(id: string): Promise<UserResponseData>;
}
