import { eq } from 'drizzle-orm';
import {
  products,
  productVariants,
  units,
  productPrices,
} from '../../database/schema/products';
import type {
  NewProduct,
  NewProductVariant,
  NewUnit,
  NewProductPrice,
} from '../../database/schema/products';
import { inventories } from '../../database/schema/inventory';
import type { Database } from '../../plugins/drizzle';

export class ProductRepository {
  constructor(private db: Database) {}

  // ─── Products ──────────────────────────────────────────────────────────────

  async createProduct(data: NewProduct) {
    const [product] = await this.db.insert(products).values(data).returning();
    return product;
  }

  async getAllProducts() {
    return this.db.select().from(products);
  }

  async getProductById(id: number) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product ?? null;
  }

  async updateProduct(id: number, data: Partial<NewProduct>) {
    const [updated] = await this.db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  // ─── Product Variants ──────────────────────────────────────────────────────

  async createProductVariant(data: NewProductVariant) {
    const [variant] = await this.db
      .insert(productVariants)
      .values(data)
      .returning();
    return variant;
  }

  async getVariantsByProductId(productId: number) {
    return this.db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productId));
  }

  async updateProductVariant(id: number, data: Partial<NewProductVariant>) {
    const [updated] = await this.db
      .update(productVariants)
      .set(data)
      .where(eq(productVariants.id, id))
      .returning();
    return updated;
  }

  // ─── Units ─────────────────────────────────────────────────────────────────

async createUnit(data: NewUnit) {
    const [unit] = await this.db.insert(units).values(data).returning();
    return unit;
}

async getAllUnits() {
    return this.db.select().from(units);
}

async updateUnit(id: number, data: Partial<NewUnit>) {
    const [updated] = await this.db
    .update(units)
    .set(data)
    .where(eq(units.id, id))
    .returning();
    return updated;
}

  // ─── Product Prices ────────────────────────────────────────────────────────

  async createProductPrice(data: NewProductPrice) {
    const [price] = await this.db
      .insert(productPrices)
      .values(data)
      .returning();
    return price;
  }

  async updateProductPrice(id: number, data: Partial<NewProductPrice>) {
    const [updated] = await this.db
      .update(productPrices)
      .set(data)
      .where(eq(productPrices.id, id))
      .returning();
    return updated;
  }

  async getPricesByVariantId(variantId: number) {
    return this.db
      .select()
      .from(productPrices)
      .where(eq(productPrices.variantId, variantId));
  }

  // ─── Inventory (used during full product creation) ─────────────────────────

  async createInventory(data: { stallId: number; variantId: number; quantity: number }) {
    const [inv] = await this.db.insert(inventories).values(data).returning();
    return inv;
  }
}