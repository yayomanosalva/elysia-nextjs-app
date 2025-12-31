import { UsersService } from './users.service';
import type { UpdateUserInput } from './users.schema';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async getAllUsers() {
    try {
      const users = await this.usersService.getAllUsers();
      return {
        success: true,
        data: users,
        count: users.length,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error al obtener usuarios'
      );
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error al obtener usuario'
      );
    }
  }

  async updateUser(userId: string, data: UpdateUserInput) {
    try {
      const updatedUser = await this.usersService.updateUser(userId, data);
      return {
        success: true,
        data: updatedUser,
        message: 'Usuario actualizado exitosamente',
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error al actualizar usuario'
      );
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.usersService.deleteUser(userId);
      return {
        success: true,
        message: 'Usuario eliminado exitosamente',
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error al eliminar usuario'
      );
    }
  }

  async getUserStats(userId: string) {
    try {
      const stats = await this.usersService.getUserStats(userId);
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error al obtener estadísticas'
      );
    }
  }
}