import { eq } from 'drizzle-orm';
import {
  suppliers,
  supplierOrders,
  supplierOrderItems,
} from '../../database/schema/suppliers';
import { users } from '../../database/schema/user';
import { productVariants, products, units } from '../../database/schema/products';
import type {
  NewSupplier,
  NewSupplierOrder,
  NewSupplierOrderItem,
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
    return this.db
      .select({
        id: supplierOrders.id,
        supplierId: supplierOrders.supplierId,
        createdBy: supplierOrders.createdBy,
        status: supplierOrders.status,
        orderDate: supplierOrders.orderDate,
        createdAt: supplierOrders.createdAt,
        supplierName: suppliers.name,
        createdByName: users.name,
      })
      .from(supplierOrders)
      .leftJoin(suppliers, eq(suppliers.id, supplierOrders.supplierId))
      .leftJoin(users, eq(users.id, supplierOrders.createdBy));
  }

  async getSupplierOrderById(id: number) {
    const [order] = await this.db
      .select({
        id: supplierOrders.id,
        supplierId: supplierOrders.supplierId,
        createdBy: supplierOrders.createdBy,
        status: supplierOrders.status,
        orderDate: supplierOrders.orderDate,
        createdAt: supplierOrders.createdAt,
        supplierName: suppliers.name,
        createdByName: users.name,
      })
      .from(supplierOrders)
      .leftJoin(suppliers, eq(suppliers.id, supplierOrders.supplierId))
      .leftJoin(users, eq(users.id, supplierOrders.createdBy))
      .where(eq(supplierOrders.id, id));
    return order ?? null;
  }

  async getOrdersBySupplierId(supplierId: number) {
    return this.db
      .select({
        id: supplierOrders.id,
        supplierId: supplierOrders.supplierId,
        createdBy: supplierOrders.createdBy,
        status: supplierOrders.status,
        orderDate: supplierOrders.orderDate,
        createdAt: supplierOrders.createdAt,
        supplierName: suppliers.name,
        createdByName: users.name,
      })
      .from(supplierOrders)
      .leftJoin(suppliers, eq(suppliers.id, supplierOrders.supplierId))
      .leftJoin(users, eq(users.id, supplierOrders.createdBy))
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

  async updateSupplierOrderItem(id: number, data: Partial<NewSupplierOrderItem>) {
    const [updated] = await this.db
      .update(supplierOrderItems)
      .set(data)
      .where(eq(supplierOrderItems.id, id))
      .returning();
    return updated;
  }

  async getItemsByOrderId(orderId: number) {
    return this.db
      .select({
        id: supplierOrderItems.id,
        orderId: supplierOrderItems.orderId,
        variantId: supplierOrderItems.variantId,
        unitId: supplierOrderItems.unitId,
        quantity: supplierOrderItems.quantity,
        price: supplierOrderItems.price,
        variantName: productVariants.name,
        qualityLevel: productVariants.qualityLevel,
        productId: products.id,
        productName: products.name,
        unitName: units.name,
        unitSymbol: units.symbol,
      })
      .from(supplierOrderItems)
      .leftJoin(productVariants, eq(productVariants.id, supplierOrderItems.variantId))
      .leftJoin(products, eq(products.id, productVariants.productId))
      .leftJoin(units, eq(units.id, supplierOrderItems.unitId))
      .where(eq(supplierOrderItems.orderId, orderId));
  }
}
