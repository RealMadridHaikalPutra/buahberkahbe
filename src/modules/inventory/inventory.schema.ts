import z from "zod";

export const createInventorySchema = z.object({
  stallId: z.number(),
  variantId: z.number(),
  quantity: z.number().int().min(0, "Quantity cannot be negative").default(0),
});

export const createInventoryMutationSchema = z.object({
  fromStallId: z.number(),
  toStallId: z.number(),
  createdBy: z.number(),
});

export const createInventoryMutationItemSchema = z.object({
  mutationId: z.number(),
  variantId: z.number(),
  unitId: z.number(),
  quantity: z.number().int().positive("Quantity must be positive"),
});

export const updateInventorySchema = z.object({
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateInventoryInput = z.infer<typeof createInventorySchema>;
export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>;
export type CreateInventoryMutationInput = z.infer<typeof createInventoryMutationSchema>;
export type CreateInventoryMutationItemInput = z.infer<typeof createInventoryMutationItemSchema>;
