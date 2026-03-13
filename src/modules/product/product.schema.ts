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
    price: z.number().int().positive("Price must be a positive number"),
});

// ─── Full product creation (product + variants + prices + stocks in one request) ──

export const createProductFullSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  active: z.number().default(1),
  description: z.string().optional(),
  variants: z.array(z.object({
    name: z.string().min(1, "Variant name is required"),
    qualityLevel: z.string().min(1, "Quality level is required"),
    prices: z.array(z.object({
      unitId: z.number(),
      price: z.number().int().positive(),
    })).optional().default([]),
    stocks: z.array(z.object({
      stallId: z.number(),
      quantity: z.number().int().min(0),
    })).optional().default([]),
  })).optional().default([]),
});

export const updateProductSchema = createProductSchema.partial();
export const updateProductVariantSchema = createProductVariantSchema.partial();
export const updateUnitSchema = createUnitSchema.partial();
export const updateProductPriceSchema = createProductPriceSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductFullInput = z.infer<typeof createProductFullSchema>;
export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>;
export type CreateUnitInput = z.infer<typeof createUnitSchema>;
export type CreateProductPriceInput = z.infer<typeof createProductPriceSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type UpdateProductVariantInput = z.infer<typeof updateProductVariantSchema>;
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;
export type UpdateProductPriceInput = z.infer<typeof updateProductPriceSchema>;