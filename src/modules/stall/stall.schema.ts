import z from "zod";

export const createStallSchema = z.object({
  name: z.string().min(1, "Stall name is required"),
  location: z.string().optional(),
});

export const updateStallSchema = createStallSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateStallInput = z.infer<typeof createStallSchema>;
export type UpdateStallInput = z.infer<typeof updateStallSchema>;
