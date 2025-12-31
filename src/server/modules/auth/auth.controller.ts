import { AuthService } from './auth.service';
import type { RegisterInput, LoginInput } from './auth.schema';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(data: RegisterInput) {
    try {
      const result = await this.authService.register(data);
      return {
        success: true,
        data: result,
        message: 'Usuario registrado exitosamente',
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error en el registro');
    }
  }

  async login(data: LoginInput) {
    try {
      const result = await this.authService.login(data);
      return {
        success: true,
        data: result,
        message: 'Login exitoso',
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error en el login');
    }
  }

  async me(sessionToken: string) {
    try {
      const user = await this.authService.getCurrentUser(sessionToken);
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'No autenticado');
    }
  }

  async logout(sessionToken: string) {
    try {
      await this.authService.logout(sessionToken);
      return {
        success: true,
        message: 'Logout exitoso',
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error en logout');
    }
  }
}