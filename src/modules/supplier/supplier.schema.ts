import z from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const createSupplierOrderSchema = z.object({
  supplierId: z.number(),
  createdBy: z.number(),
  status: z.enum(['pending', 'confirmed', 'delivered', 'cancelled']).default('pending'),
  orderDate: z.string().min(1, "Order date is required"),
  items: z.array(z.object({
    variantId: z.number(),
    unitId: z.number(),
    quantity: z.number().int().positive("Quantity must be positive"),
    price: z.number().int().positive("Price must be positive"),
  })).min(1, 'At least one order item is required'),
});

export const createSupplierOrderItemSchema = z.object({
  orderId: z.number(),
  variantId: z.number(),
  unitId: z.number(),
  quantity: z.number().int().positive("Quantity must be positive"),
  price: z.number().int().positive("Price must be positive"),
});

export const updateSupplierOrderItemSchema = createSupplierOrderItemSchema
  .omit({ orderId: true, variantId: true })
  .partial();

export const updateSupplierSchema = createSupplierSchema.partial();
export const updateSupplierOrderSchema = createSupplierOrderSchema.omit({ items: true }).partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;

export type CreateSupplierOrderInput = z.infer<typeof createSupplierOrderSchema>;
export type UpdateSupplierOrderInput = z.infer<typeof updateSupplierOrderSchema>;
export type UpdateSupplierOrderItemInput = z.infer<typeof updateSupplierOrderItemSchema>;
