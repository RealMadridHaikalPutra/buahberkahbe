import { SalesRepository } from './sales.repository';
import {
  createSaleSchema,
  updateSaleSchema,
  createSaleItemSchema,
  type CreateSaleInput,
  type UpdateSaleInput,
  type CreateSaleItemInput,
} from './sales.schema';
import type { Sale, SaleItem } from '../../database/schema/sales';

export class SalesService {
  constructor(private repo: SalesRepository) {}

  // ─── Sales ───────────────────────────────────────────────────────────────────

  async createSale(data: unknown): Promise<Sale> {
    const parsed: CreateSaleInput = createSaleSchema.parse(data);
    const sale = await this.repo.createSale(parsed);
    if (!sale) throw new Error('Failed to create sale');
    return sale;
  }

  async getAllSales(): Promise<Sale[]> {
    return this.repo.getAllSales();
  }

  async getSaleById(id: number): Promise<Sale> {
    const sale = await this.repo.getSaleById(id);
    if (!sale) throw new Error('Sale not found');
    return sale;
  }

  async getSalesByStallId(stallId: number): Promise<Sale[]> {
    return this.repo.getSalesByStallId(stallId);
  }

  async updateSale(id: number, data: unknown): Promise<Sale> {
    const parsed: UpdateSaleInput = updateSaleSchema.parse(data);
    const sale = await this.repo.updateSale(id, parsed);
    if (!sale) throw new Error('Sale not found');
    return sale;
  }

  // ─── Sale Items ────────────────────────────────────────────────────────────

  async createSaleItem(data: unknown): Promise<SaleItem> {
    const parsed: CreateSaleItemInput = createSaleItemSchema.parse(data);
    const item = await this.repo.createSaleItem(parsed);
    if (!item) throw new Error('Failed to create sale item');
    return item;
  }

  async getSaleItemsBySaleId(saleId: number): Promise<SaleItem[]> {
    return this.repo.getSaleItemsBySaleId(saleId);
  }
}
