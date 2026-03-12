import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  numeric,
  timestamp,
  date,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user';
import { stalls } from './stalls';
import { productVariants, units } from './products';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const supplierOrderStatusEnum = pgEnum('supplier_order_status', [
  'pending',
  'confirmed',
  'delivered',
  'cancelled',
]);

// ─── Suppliers ────────────────────────────────────────────────────────────────

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Supplier Orders ──────────────────────────────────────────────────────────

export const supplierOrders = pgTable('supplier_orders', {
  id: serial('id').primaryKey(),
  supplierId: integer('supplier_id')
    .notNull()
    .references(() => suppliers.id, { onDelete: 'restrict' }),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  status: supplierOrderStatusEnum('status').notNull().default('pending'),
  orderDate: date('order_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Supplier Order Items ─────────────────────────────────────────────────────

export const supplierOrderItems = pgTable('supplier_order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => supplierOrders.id, { onDelete: 'cascade' }),
  variantId: integer('variant_id')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'restrict' }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'restrict' }),
  quantity: numeric('quantity', { precision: 15, scale: 3 }).notNull(),
  price: numeric('price', { precision: 15, scale: 2 }).notNull(),
});

// ─── Supplier Deliveries ──────────────────────────────────────────────────────

export const supplierDeliveries = pgTable('supplier_deliveries', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => supplierOrders.id, { onDelete: 'restrict' }),
  deliveryDate: date('delivery_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Supplier Delivery Items ──────────────────────────────────────────────────

export const supplierDeliveryItems = pgTable('supplier_delivery_items', {
  id: serial('id').primaryKey(),
  deliveryId: integer('delivery_id')
    .notNull()
    .references(() => supplierDeliveries.id, { onDelete: 'cascade' }),
  stallId: integer('stall_id')
    .notNull()
    .references(() => stalls.id, { onDelete: 'restrict' }),
  variantId: integer('variant_id')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'restrict' }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'restrict' }),
  quantity: numeric('quantity', { precision: 15, scale: 3 }).notNull(),
  price: numeric('price', { precision: 15, scale: 2 }).notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Supplier = InferSelectModel<typeof suppliers>;
export type NewSupplier = InferInsertModel<typeof suppliers>;

export type SupplierOrder = InferSelectModel<typeof supplierOrders>;
export type NewSupplierOrder = InferInsertModel<typeof supplierOrders>;

export type SupplierOrderItem = InferSelectModel<typeof supplierOrderItems>;
export type NewSupplierOrderItem = InferInsertModel<typeof supplierOrderItems>;

export type SupplierDelivery = InferSelectModel<typeof supplierDeliveries>;
export type NewSupplierDelivery = InferInsertModel<typeof supplierDeliveries>;

export type SupplierDeliveryItem = InferSelectModel<typeof supplierDeliveryItems>;
export type NewSupplierDeliveryItem = InferInsertModel<typeof supplierDeliveryItems>;
