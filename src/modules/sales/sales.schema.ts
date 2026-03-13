import z from "zod";

export const createSaleSchema = z.object({
  stallId: z.number(),
  createdBy: z.number(),
  saleType: z.enum(['retail', 'wholesale']),
  totalAmount: z.number().int().positive("Total amount must be positive"),
});

export const createSaleItemSchema = z.object({
  saleId: z.number(),
  variantId: z.number(),
  unitId: z.number(),
  quantity: z.number().int().positive("Quantity must be positive"),
  price: z.number().int().positive("Price must be positive"),
  subtotal: z.number().int().positive("Subtotal must be positive"),
});

export const updateSaleSchema = createSaleSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
export type UpdateSaleInput = z.infer<typeof updateSaleSchema>;
export type CreateSaleItemInput = z.infer<typeof createSaleItemSchema>;
