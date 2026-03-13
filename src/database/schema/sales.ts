import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { stalls } from './stalls';
import { users } from './user';
import { productVariants, units } from './products';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const saleTypeEnum = pgEnum('sale_type', ['retail', 'wholesale']);

// ─── Sales ────────────────────────────────────────────────────────────────────

export const sales = pgTable('sales', {
  id: serial('id').primaryKey(),
  stallId: integer('stall_id')
    .notNull()
    .references(() => stalls.id, { onDelete: 'restrict' }),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  saleType: saleTypeEnum('sale_type').notNull(),
  totalAmount: integer('total_amount').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Sale Items ───────────────────────────────────────────────────────────────

export const saleItems = pgTable('sale_items', {
  id: serial('id').primaryKey(),
  saleId: integer('sale_id')
    .notNull()
    .references(() => sales.id, { onDelete: 'cascade' }),
  variantId: integer('variant_id')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'restrict' }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  subtotal: integer('subtotal').notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Sale = InferSelectModel<typeof sales>;
export type NewSale = InferInsertModel<typeof sales>;

export type SaleItem = InferSelectModel<typeof saleItems>;
export type NewSaleItem = InferInsertModel<typeof saleItems>;
