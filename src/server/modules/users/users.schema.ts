import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  image: z.string().url('URL de imagen inválida').optional(),
});

export const getUserByIdSchema = z.object({
  id: z.string().uuid('ID de usuario inválido'),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;