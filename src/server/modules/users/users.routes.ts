import { Elysia, t } from 'elysia';
import { UsersController } from './users.controller';
import { updateUserSchema, getUserByIdSchema } from './users.schema';

const usersController = new UsersController();

export const userRoutes = new Elysia({ prefix: '/users' })
  // GET /api/users - Obtener todos los usuarios
  .get('/', async () => {
    return usersController.getAllUsers();
  })

  // GET /api/users/:id - Obtener usuario por ID
  .get(
    '/:id',
    async ({ params }) => {
      const validated = getUserByIdSchema.parse(params);
      return usersController.getUserById(validated.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  // GET /api/users/:id/stats - Obtener estadísticas del usuario
  .get(
    '/:id/stats',
    async ({ params }) => {
      const validated = getUserByIdSchema.parse(params);
      return usersController.getUserStats(validated.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  // PATCH /api/users/:id - Actualizar usuario
  .patch(
    '/:id',
    async ({ params, body }) => {
      const validatedParams = getUserByIdSchema.parse(params);
      const validatedBody = updateUserSchema.parse(body);
      return usersController.updateUser(validatedParams.id, validatedBody);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.Optional(t.String()),
        image: t.Optional(t.String()),
      }),
    }
  )

  // DELETE /api/users/:id - Eliminar usuario
  .delete(
    '/:id',
    async ({ params }) => {
      const validated = getUserByIdSchema.parse(params);
      return usersController.deleteUser(validated.id);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );