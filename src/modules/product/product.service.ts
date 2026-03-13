import { ProductRepository } from "./product.repository";
import {
  createProductFullSchema,
  createProductVariantSchema,
  createUnitSchema,
  createProductPriceSchema,
  updateProductSchema,
  updateProductVariantSchema,
  updateUnitSchema,
  updateProductPriceSchema,
  type CreateProductFullInput,
  type CreateProductVariantInput,
  type CreateUnitInput,
  type CreateProductPriceInput,
  type UpdateProductInput,
  type UpdateProductVariantInput,
  type UpdateUnitInput,
  type UpdateProductPriceInput,
} from "./product.schema";
import type {
  Product,
  ProductVariant,
  Unit,
  ProductPrice,
  NewProduct,
  NewProductPrice,
} from "../../database/schema/products";

export class ProductService {
  constructor(private repo: ProductRepository) {}

  // ─── Products ─────────────────────────────────

  async createProduct(data: unknown): Promise<Product> {
    const parsed: CreateProductFullInput = createProductFullSchema.parse(data);
    const { variants, ...productData } = parsed;

    const product = await this.repo.createProduct(productData);
    if (!product) throw new Error("Failed to create product");

    for (const v of variants) {
      const { prices, stocks, ...variantData } = v;
      const variant = await this.repo.createProductVariant({ ...variantData, productId: product.id, active: 1 });
      if (!variant) continue;

      for (const p of prices) {
        await this.repo.createProductPrice({ variantId: variant.id, unitId: p.unitId, price: p.price });
      }
      for (const s of stocks) {
        await this.repo.createInventory({ stallId: s.stallId, variantId: variant.id, quantity: Number(s.quantity) });
      }
    }

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.repo.getAllProducts();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.repo.getProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async updateProduct(id: number, data: unknown): Promise<Product> {
    const parsed: UpdateProductInput = updateProductSchema.parse(data);
    const product = await this.repo.updateProduct(id, parsed);
    if (!product) throw new Error("Product not found");
    return product;
  }

  // ─── Variants ─────────────────────────────────

  async createVariant(data: unknown): Promise<ProductVariant> {
    const parsed: CreateProductVariantInput = createProductVariantSchema.parse(data);
    const variant = await this.repo.createProductVariant(parsed);
    if (!variant) throw new Error("Failed to create variant");
    return variant;
  }

  async getVariants(productId: number): Promise<ProductVariant[]> {
    return this.repo.getVariantsByProductId(productId);
  }

  async updateVariant(id: number, data: unknown): Promise<ProductVariant> {
    const parsed: UpdateProductVariantInput = updateProductVariantSchema.parse(data);
    const variant = await this.repo.updateProductVariant(id, parsed);
    if (!variant) throw new Error("Variant not found");
    return variant;
  }

  // ─── Units ────────────────────────────────────

  async createUnit(data: unknown): Promise<Unit> {
    const parsed: CreateUnitInput = createUnitSchema.parse(data);
    const unit = await this.repo.createUnit(parsed);
    if (!unit) throw new Error("Failed to create unit");
    return unit;
  }

  async getUnits(): Promise<Unit[]> {
    return this.repo.getAllUnits();
  }

  async updateUnit(id: number, data: unknown): Promise<Unit> {
    const parsed: UpdateUnitInput = updateUnitSchema.parse(data);
    const unit = await this.repo.updateUnit(id, parsed);
    if (!unit) throw new Error("Unit not found");
    return unit;
  }

  // ─── Prices ───────────────────────────────────

  async createPrice(data: unknown): Promise<ProductPrice> {
    const parsed: CreateProductPriceInput = createProductPriceSchema.parse(data);
    const price = await this.repo.createProductPrice(parsed);
    if (!price) throw new Error("Failed to create price");
    return price;
  }

  async updatePrice(id: number, data: unknown): Promise<ProductPrice> {
    const parsed: UpdateProductPriceInput = updateProductPriceSchema.parse(data);
    const price = await this.repo.updateProductPrice(id, parsed);
    if (!price) throw new Error("Price not found");
    return price;
  }

  async getPrices(variantId: number): Promise<ProductPrice[]> {
    return this.repo.getPricesByVariantId(variantId);
  }
}