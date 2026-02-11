import { JsonValue } from 'generated/prisma/runtime/client';
import type { Subscription } from '../../domain/user.interface';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  stripeCustomerId?: string;
  preferences?: JsonValue;
  roles?: string[];
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date | null;
}
