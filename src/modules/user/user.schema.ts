import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  passwordHash: z.string().min(1, "Password hash is required"),
  role: z.enum(['admin', 'worker']).default('worker'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  role: z.enum(['admin', 'worker']).optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
