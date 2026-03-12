import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// ─── Table ────────────────────────────────────────────────────────────────────

export const stalls = pgTable('stalls', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Stall = InferSelectModel<typeof stalls>;
export type NewStall = InferInsertModel<typeof stalls>;
