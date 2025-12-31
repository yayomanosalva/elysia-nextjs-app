import { db } from '@/server/lib/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import type { UpdateUserInput } from './users.schema';
import type { SafeUser } from './users.types';

export class UsersService {
  async getAllUsers(): Promise<SafeUser[]> {
    const allUsers = await db.query.users.findMany({
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });

    return allUsers;
  }

  async getUserById(userId: string): Promise<SafeUser> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  async updateUser(userId: string, data: UpdateUserInput): Promise<SafeUser> {
    const existingUser = await this.getUserById(userId);

    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        image: users.image,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
      });

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const existingUser = await this.getUserById(userId);

    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    await db.delete(users).where(eq(users.id, userId));
  }

  async getUserStats(userId: string) {
    const user = await this.getUserById(userId);

    // Aquí puedes agregar más estadísticas según tu lógica
    return {
      user,
      stats: {
        accountAge: this.calculateAccountAge(user.createdAt),
        isVerified: !!user.emailVerified,
        role: user.role,
      },
    };
  }

  private calculateAccountAge(createdAt: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} días`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    }
  }
}