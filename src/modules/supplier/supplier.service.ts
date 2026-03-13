import { SupplierRepository } from './supplier.repository';
import {
  createSupplierSchema,
  updateSupplierSchema,
  createSupplierOrderSchema,
  updateSupplierOrderItemSchema,
  updateSupplierOrderSchema,
  type CreateSupplierInput,
  type UpdateSupplierInput,
  type CreateSupplierOrderInput,
  type UpdateSupplierOrderItemInput,
  type UpdateSupplierOrderInput,
} from './supplier.schema';
import type {
  Supplier,
  SupplierOrder,
  SupplierOrderItem,
} from '../../database/schema/suppliers';

export class SupplierService {
  constructor(private repo: SupplierRepository) {}

  // ─── Suppliers ───────────────────────────────────────────────────────────

  async createSupplier(data: unknown): Promise<Supplier> {
    const parsed: CreateSupplierInput = createSupplierSchema.parse(data);
    const supplier = await this.repo.createSupplier(parsed);
    if (!supplier) throw new Error('Failed to create supplier');
    return supplier;
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    return this.repo.getAllSuppliers();
  }

  async getSupplierById(id: number): Promise<Supplier> {
    const supplier = await this.repo.getSupplierById(id);
    if (!supplier) throw new Error('Supplier not found');
    return supplier;
  }

  async updateSupplier(id: number, data: unknown): Promise<Supplier> {
    const parsed: UpdateSupplierInput = updateSupplierSchema.parse(data);
    const supplier = await this.repo.updateSupplier(id, parsed);
    if (!supplier) throw new Error('Supplier not found');
    return supplier;
  }

  // ─── Supplier Orders ──────────────────────────────────────────────────────────

  async createSupplierOrder(data: unknown): Promise<SupplierOrder> {
    const parsed: CreateSupplierOrderInput = createSupplierOrderSchema.parse(data);
    const { items, ...orderData } = parsed;
    const order = await this.repo.createSupplierOrder(orderData);
    if (!order) throw new Error('Failed to create supplier order');

    for (const item of items) {
      await this.repo.createSupplierOrderItem({
        orderId: order.id,
        variantId: item.variantId,
        unitId: item.unitId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    return order;
  }

  async getAllSupplierOrders(): Promise<SupplierOrder[]> {
    return this.repo.getAllSupplierOrders();
  }

  async getSupplierOrderById(id: number): Promise<SupplierOrder> {
    const order = await this.repo.getSupplierOrderById(id);
    if (!order) throw new Error('Supplier order not found');
    return order;
  }

  async getOrdersBySupplierId(supplierId: number): Promise<SupplierOrder[]> {
    return this.repo.getOrdersBySupplierId(supplierId);
  }

  async updateSupplierOrder(id: number, data: unknown): Promise<SupplierOrder> {
    const parsed: UpdateSupplierOrderInput = updateSupplierOrderSchema.parse(data);
    const order = await this.repo.updateSupplierOrder(id, parsed);
    if (!order) throw new Error('Supplier order not found');
    return order;
  }

  async updateSupplierOrderItem(id: number, data: unknown): Promise<SupplierOrderItem> {
    const parsed: UpdateSupplierOrderItemInput = updateSupplierOrderItemSchema.parse(data);
    const item = await this.repo.updateSupplierOrderItem(id, parsed);
    if (!item) throw new Error('Supplier order item not found');
    return item;
  }

  async getItemsByOrderId(orderId: number): Promise<SupplierOrderItem[]> {
    return this.repo.getItemsByOrderId(orderId);
  }
}
