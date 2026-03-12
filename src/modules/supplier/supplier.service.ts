import { SupplierRepository } from './supplier.repository';
import {
  createSupplierSchema,
  updateSupplierSchema,
  createSupplierOrderSchema,
  updateSupplierOrderSchema,
  createSupplierOrderItemSchema,
  createSupplierDeliverySchema,
  createSupplierDeliveryItemSchema,
  type CreateSupplierInput,
  type UpdateSupplierInput,
  type CreateSupplierOrderInput,
  type UpdateSupplierOrderInput,
  type CreateSupplierOrderItemInput,
  type CreateSupplierDeliveryInput,
  type CreateSupplierDeliveryItemInput,
} from './supplier.schema';
import type {
  Supplier,
  SupplierOrder,
  SupplierOrderItem,
  SupplierDelivery,
  SupplierDeliveryItem,
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
    const order = await this.repo.createSupplierOrder(parsed);
    if (!order) throw new Error('Failed to create supplier order');
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

  // ─── Supplier Order Items ─────────────────────────────────────────────────────

  async createSupplierOrderItem(data: unknown): Promise<SupplierOrderItem> {
    const parsed: CreateSupplierOrderItemInput = createSupplierOrderItemSchema.parse(data);
    const item = await this.repo.createSupplierOrderItem(parsed);
    if (!item) throw new Error('Failed to create order item');
    return item;
  }

  async getItemsByOrderId(orderId: number): Promise<SupplierOrderItem[]> {
    return this.repo.getItemsByOrderId(orderId);
  }

  // ─── Supplier Deliveries ──────────────────────────────────────────────────────

  async createSupplierDelivery(data: unknown): Promise<SupplierDelivery> {
    const parsed: CreateSupplierDeliveryInput = createSupplierDeliverySchema.parse(data);
    const delivery = await this.repo.createSupplierDelivery(parsed);
    if (!delivery) throw new Error('Failed to create delivery');
    return delivery;
  }

  async getDeliveriesByOrderId(orderId: number): Promise<SupplierDelivery[]> {
    return this.repo.getDeliveriesByOrderId(orderId);
  }

  // ─── Supplier Delivery Items ───────────────────────────────────────────────────

  async createSupplierDeliveryItem(data: unknown): Promise<SupplierDeliveryItem> {
    const parsed: CreateSupplierDeliveryItemInput = createSupplierDeliveryItemSchema.parse(data);
    const item = await this.repo.createSupplierDeliveryItem(parsed);
    if (!item) throw new Error('Failed to create delivery item');
    return item;
  }

  async getDeliveryItemsByDeliveryId(deliveryId: number): Promise<SupplierDeliveryItem[]> {
    return this.repo.getDeliveryItemsByDeliveryId(deliveryId);
  }
}
