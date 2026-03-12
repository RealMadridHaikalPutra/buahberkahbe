import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  active: z.number().default(1),
  description: z.string().optional(),
});

export const createProductVariantSchema = z.object({
    productId: z.number(),
    name: z.string().min(1, "Product variant name is required"),
    qualityLevel: z.string().min(1, "Quality level is required"),
    active: z.number().default(1),
});

export const createUnitSchema = z.object({
    name: z.string().min(1, "Unit name is required"),
    symbol: z.string().min(1, "Unit symbol is required"),
});

export const createProductPriceSchema = z.object({
    variantId: z.number(),
    unitId: z.number(),
    price: z.number().positive("Price must be a positive number").transform(v => v.toString()),
});

export const updateProductSchema = createProductSchema.partial();
export const updateProductVariantSchema = createProductVariantSchema.partial();
export const updateUnitSchema = createUnitSchema.partial();
export const updateProductPriceSchema = createProductPriceSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>;
export type CreateUnitInput = z.infer<typeof createUnitSchema>;
export type CreateProductPriceInput = z.infer<typeof createProductPriceSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type UpdateProductVariantInput = z.infer<typeof updateProductVariantSchema>;
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;
export type UpdateProductPriceInput = z.infer<typeof updateProductPriceSchema>;