import { db } from '@/server/lib/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/server/lib/auth';
import type { RegisterInput, LoginInput } from './auth.schema';

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Better Auth handles password hashing automatically
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    return result;
  }

  async login(data: LoginInput) {
    const result = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    if (!result) {
      throw new Error('Credenciales inválidas');
    }

    return result;
  }

  async getCurrentUser(sessionToken: string) {
    const session = await auth.api.getSession({
      headers: {
        authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!session) {
      throw new Error('Sesión inválida');
    }

    return session.user;
  }

  async logout(sessionToken: string) {
    await auth.api.signOut({
      headers: {
        authorization: `Bearer ${sessionToken}`,
      },
    });

    return { success: true };
  }
}