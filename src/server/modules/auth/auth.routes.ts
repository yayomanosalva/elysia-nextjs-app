import { Elysia, t } from 'elysia';
import { AuthController } from './auth.controller';
import { registerSchema, loginSchema } from './auth.schema';

const authController = new AuthController();

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body }) => {
      const validated = registerSchema.parse(body);
      return authController.register(validated);
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        name: t.String(),
      }),
    }
  )
  .post(
    '/login',
    async ({ body }) => {
      const validated = loginSchema.parse(body);
      return authController.login(validated);
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get('/me', async ({ headers }) => {
    const token = headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No autorizado');
    }
    return authController.me(token);
  })
  .post('/logout', async ({ headers }) => {
    const token = headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No autorizado');
    }
    return authController.logout(token);
  });