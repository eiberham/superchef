import type { UserPreferences } from '../../domain/user.interface';

export class UserResponseDto {
    id: number;
    name: string;
    email: string;
    preferences?: UserPreferences;
    roles?: string[];
    createdAt: Date;
    updatedAt: Date;
}