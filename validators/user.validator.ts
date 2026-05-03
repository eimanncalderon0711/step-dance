import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1).optional(),
  roleId: z.number().int(),
});

export const updateUserSchema = z.object({
  id: z.number().int(),
  email: z.email().optional(),
  name: z.string().min(1).optional(),
  roleId: z.number().int().optional(),
});