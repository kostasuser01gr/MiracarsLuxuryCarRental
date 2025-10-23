import { z } from 'zod';

// User Role
export const UserRoleSchema = z.enum(['admin', 'staff', 'customer']);

export type UserRole = z.infer<typeof UserRoleSchema>;

// User Model
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  role: UserRoleSchema,
  verified: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
