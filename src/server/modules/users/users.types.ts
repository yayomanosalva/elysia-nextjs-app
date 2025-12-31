import type { User } from '@/server/db/schema';

export interface UpdateUserInput {
  name?: string;
  image?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  role: 'admin' | 'user';
  image: string | null;
  createdAt: Date;
}

export type SafeUser = Omit<User, 'updatedAt'>;