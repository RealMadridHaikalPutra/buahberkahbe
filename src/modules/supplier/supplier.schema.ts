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
});

export const createSupplierOrderItemSchema = z.object({
  orderId: z.number(),
  variantId: z.number(),
  unitId: z.number(),
  quantity: z.number().positive("Quantity must be positive").transform(v => v.toString()),
  price: z.number().positive("Price must be positive").transform(v => v.toString()),
});

export const createSupplierDeliverySchema = z.object({
  orderId: z.number(),
  deliveryDate: z.string().min(1, "Delivery date is required"),
});

export const createSupplierDeliveryItemSchema = z.object({
  deliveryId: z.number(),
  stallId: z.number(),
  variantId: z.number(),
  unitId: z.number(),
  quantity: z.number().positive("Quantity must be positive").transform(v => v.toString()),
  price: z.number().positive("Price must be positive").transform(v => v.toString()),
});

export const updateSupplierSchema = createSupplierSchema.partial();
export const updateSupplierOrderSchema = createSupplierOrderSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;

export type CreateSupplierOrderInput = z.infer<typeof createSupplierOrderSchema>;
export type UpdateSupplierOrderInput = z.infer<typeof updateSupplierOrderSchema>;

export type CreateSupplierOrderItemInput = z.infer<typeof createSupplierOrderItemSchema>;
export type CreateSupplierDeliveryInput = z.infer<typeof createSupplierDeliverySchema>;
export type CreateSupplierDeliveryItemInput = z.infer<typeof createSupplierDeliveryItemSchema>;
