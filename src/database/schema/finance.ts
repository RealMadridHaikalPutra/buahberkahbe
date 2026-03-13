import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  date,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { stalls } from './stalls';
import { users } from './user';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const cashflowTypeEnum = pgEnum('cashflow_type', ['income', 'expense']);

/**
 * Daftar tabel yang bisa menjadi sumber cashflow.
 * Tambahkan nilai baru di sini jika ada tabel sumber baru.
 *  sales               → penjualan
 *  expenses            → pengeluaran operasional
 *  salary_payments     → pembayaran gaji
 *  supplier_orders     → pembelian ke supplier
 *  manual              → entri manual (tanpa source_id)
 */
export const cashflowSourceTypeEnum = pgEnum('cashflow_source_type', [
  'sales',
  'expenses',
  'salary_payments',
  'supplier_orders',
  'manual',
]);

// ─── Expenses ─────────────────────────────────────────────────────────────────

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  stallId: integer('stall_id')
    .notNull()
    .references(() => stalls.id, { onDelete: 'restrict' }),
  category: varchar('category', { length: 100 }).notNull(),
  amount: integer('amount').notNull(),
  description: text('description'),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Cashflows ────────────────────────────────────────────────────────────────
// Tabel polimorfik: setiap baris arus kas merujuk ke sumber transaksi manapun
// melalui pasangan (source_type, source_id). Tidak dibuat FK ke source_id
// karena tujuannya bersifat dinamis lintas tabel.

export const cashflows = pgTable('cashflows', {
  id: serial('id').primaryKey(),

  // Lapak tempat arus kas terjadi (nullable untuk transaksi level pusat)
  stallId: integer('stall_id').references(() => stalls.id, {
    onDelete: 'set null',
  }),

  type: cashflowTypeEnum('type').notNull(),
  amount: integer('amount').notNull(),

  // Polimorfik: tabel asal + ID record asal
  sourceType: cashflowSourceTypeEnum('source_type').notNull(),
  sourceId: integer('source_id'), // null untuk entri manual

  description: text('description'),
  transactionDate: date('transaction_date').notNull(),

  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Expense = InferSelectModel<typeof expenses>;
export type NewExpense = InferInsertModel<typeof expenses>;

export type Cashflow = InferSelectModel<typeof cashflows>;
export type NewCashflow = InferInsertModel<typeof cashflows>;
