import z from "zod";

export const createSaleSchema = z.object({
  stallId: z.number(),
  createdBy: z.number(),
  saleType: z.enum(['retail', 'wholesale']),
  totalAmount: z.number().positive("Total amount must be positive").transform(v => v.toString()),
});

export const createSaleItemSchema = z.object({
  saleId: z.number(),
  variantId: z.number(),
  unitId: z.number(),
  quantity: z.number().positive("Quantity must be positive").transform(v => v.toString()),
  price: z.number().positive("Price must be positive").transform(v => v.toString()),
  subtotal: z.number().positive("Subtotal must be positive").transform(v => v.toString()),
});

export const updateSaleSchema = createSaleSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
export type UpdateSaleInput = z.infer<typeof updateSaleSchema>;
export type CreateSaleItemInput = z.infer<typeof createSaleItemSchema>;
