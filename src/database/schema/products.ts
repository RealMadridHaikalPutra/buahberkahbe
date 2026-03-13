import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  active: integer('active').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Product Variants ─────────────────────────────────────────────────────────

export const productVariants = pgTable('product_variants', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  qualityLevel: varchar('quality_level', { length: 100 }),
  active: integer('active').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Units ────────────────────────────────────────────────────────────────────

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  symbol: varchar('symbol', { length: 20 }).notNull(),
});

// ─── Product Prices ───────────────────────────────────────────────────────────

export const productPrices = pgTable('product_prices', {
  id: serial('id').primaryKey(),
  variantId: integer('variant_id')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'restrict' }),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export type ProductVariant = InferSelectModel<typeof productVariants>;
export type NewProductVariant = InferInsertModel<typeof productVariants>;

export type Unit = InferSelectModel<typeof units>;
export type NewUnit = InferInsertModel<typeof units>;

export type ProductPrice = InferSelectModel<typeof productPrices>;
export type NewProductPrice = InferInsertModel<typeof productPrices>;
