import {
  pgTable,
  serial,
  integer,
  numeric,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { stalls } from './stalls';
import { users } from './user';
import { productVariants, units } from './products';

// ─── Inventories ──────────────────────────────────────────────────────────────

export const inventories = pgTable(
  'inventories',
  {
    id: serial('id').primaryKey(),
    stallId: integer('stall_id')
      .notNull()
      .references(() => stalls.id, { onDelete: 'restrict' }),
    variantId: integer('variant_id')
      .notNull()
      .references(() => productVariants.id, { onDelete: 'restrict' }),
    quantity: numeric('quantity', { precision: 15, scale: 3 })
      .notNull()
      .default('0'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [unique('uq_inventory_stall_variant').on(t.stallId, t.variantId)],
);

// ─── Inventory Mutations ──────────────────────────────────────────────────────

export const inventoryMutations = pgTable('inventory_mutations', {
  id: serial('id').primaryKey(),
  fromStallId: integer('from_stall_id')
    .notNull()
    .references(() => stalls.id, { onDelete: 'restrict' }),
  toStallId: integer('to_stall_id')
    .notNull()
    .references(() => stalls.id, { onDelete: 'restrict' }),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Inventory Mutation Items ─────────────────────────────────────────────────

export const inventoryMutationItems = pgTable('inventory_mutation_items', {
  id: serial('id').primaryKey(),
  mutationId: integer('mutation_id')
    .notNull()
    .references(() => inventoryMutations.id, { onDelete: 'cascade' }),
  variantId: integer('variant_id')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'restrict' }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'restrict' }),
  quantity: numeric('quantity', { precision: 15, scale: 3 }).notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Inventory = InferSelectModel<typeof inventories>;
export type NewInventory = InferInsertModel<typeof inventories>;

export type InventoryMutation = InferSelectModel<typeof inventoryMutations>;
export type NewInventoryMutation = InferInsertModel<typeof inventoryMutations>;

export type InventoryMutationItem = InferSelectModel<typeof inventoryMutationItems>;
export type NewInventoryMutationItem = InferInsertModel<typeof inventoryMutationItems>;
