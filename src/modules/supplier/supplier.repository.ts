import { eq } from 'drizzle-orm';
import {
  suppliers,
  supplierOrders,
  supplierOrderItems,
  supplierDeliveries,
  supplierDeliveryItems,
} from '../../database/schema/suppliers';
import type {
  NewSupplier,
  NewSupplierOrder,
  NewSupplierOrderItem,
  NewSupplierDelivery,
  NewSupplierDeliveryItem,
} from '../../database/schema/suppliers';
import type { Database } from '../../plugins/drizzle';

export class SupplierRepository {
  constructor(private db: Database) {}

  // ─── Suppliers ──────────────────────────────────────────────────────────────────

  async createSupplier(data: NewSupplier) {
    const [supplier] = await this.db.insert(suppliers).values(data).returning();
    return supplier;
  }

  async getAllSuppliers() {
    return this.db.select().from(suppliers);
  }

  async getSupplierById(id: number) {
    const [supplier] = await this.db
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id));
    return supplier ?? null;
  }

  async updateSupplier(id: number, data: Partial<NewSupplier>) {
    const [updated] = await this.db
      .update(suppliers)
      .set(data)
      .where(eq(suppliers.id, id))
      .returning();
    return updated;
  }

  // ─── Supplier Orders ──────────────────────────────────────────────────────────

  async createSupplierOrder(data: NewSupplierOrder) {
    const [order] = await this.db.insert(supplierOrders).values(data).returning();
    return order;
  }

  async getAllSupplierOrders() {
    return this.db.select().from(supplierOrders);
  }

  async getSupplierOrderById(id: number) {
    const [order] = await this.db
      .select()
      .from(supplierOrders)
      .where(eq(supplierOrders.id, id));
    return order ?? null;
  }

  async getOrdersBySupplierId(supplierId: number) {
    return this.db
      .select()
      .from(supplierOrders)
      .where(eq(supplierOrders.supplierId, supplierId));
  }

  async updateSupplierOrder(id: number, data: Partial<NewSupplierOrder>) {
    const [updated] = await this.db
      .update(supplierOrders)
      .set(data)
      .where(eq(supplierOrders.id, id))
      .returning();
    return updated;
  }

  // ─── Supplier Order Items ─────────────────────────────────────────────────────

  async createSupplierOrderItem(data: NewSupplierOrderItem) {
    const [item] = await this.db.insert(supplierOrderItems).values(data).returning();
    return item;
  }

  async getItemsByOrderId(orderId: number) {
    return this.db
      .select()
      .from(supplierOrderItems)
      .where(eq(supplierOrderItems.orderId, orderId));
  }

  // ─── Supplier Deliveries ──────────────────────────────────────────────────────

  async createSupplierDelivery(data: NewSupplierDelivery) {
    const [delivery] = await this.db.insert(supplierDeliveries).values(data).returning();
    return delivery;
  }

  async getDeliveriesByOrderId(orderId: number) {
    return this.db
      .select()
      .from(supplierDeliveries)
      .where(eq(supplierDeliveries.orderId, orderId));
  }

  // ─── Supplier Delivery Items ───────────────────────────────────────────────────

  async createSupplierDeliveryItem(data: NewSupplierDeliveryItem) {
    const [item] = await this.db.insert(supplierDeliveryItems).values(data).returning();
    return item;
  }

  async getDeliveryItemsByDeliveryId(deliveryId: number) {
    return this.db
      .select()
      .from(supplierDeliveryItems)
      .where(eq(supplierDeliveryItems.deliveryId, deliveryId));
  }
}
