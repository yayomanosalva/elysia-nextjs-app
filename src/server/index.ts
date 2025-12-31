import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/users/users.routes';

export const app = new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      credentials: true,
    })
  )
  .use(authRoutes)
  .use(userRoutes)
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

export type App = typeof app;