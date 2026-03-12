import { eq } from 'drizzle-orm';
import { sales, saleItems } from '../../database/schema/sales';
import type { NewSale, NewSaleItem } from '../../database/schema/sales';
import type { Database } from '../../plugins/drizzle';

export class SalesRepository {
  constructor(private db: Database) {}

  // ─── Sales ───────────────────────────────────────────────────────────────────

  async createSale(data: NewSale) {
    const [sale] = await this.db.insert(sales).values(data).returning();
    return sale;
  }

  async getAllSales() {
    return this.db.select().from(sales);
  }

  async getSaleById(id: number) {
    const [sale] = await this.db
      .select()
      .from(sales)
      .where(eq(sales.id, id));
    return sale ?? null;
  }

  async getSalesByStallId(stallId: number) {
    return this.db
      .select()
      .from(sales)
      .where(eq(sales.stallId, stallId));
  }

  async updateSale(id: number, data: Partial<NewSale>) {
    const [updated] = await this.db
      .update(sales)
      .set(data)
      .where(eq(sales.id, id))
      .returning();
    return updated;
  }

  // ─── Sale Items ────────────────────────────────────────────────────────────

  async createSaleItem(data: NewSaleItem) {
    const [item] = await this.db.insert(saleItems).values(data).returning();
    return item;
  }

  async getSaleItemsBySaleId(saleId: number) {
    return this.db
      .select()
      .from(saleItems)
      .where(eq(saleItems.saleId, saleId));
  }
}
