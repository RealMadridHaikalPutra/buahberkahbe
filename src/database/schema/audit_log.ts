import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  jsonb,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user';

// ─── Enum ─────────────────────────────────────────────────────────────────────

export const auditActionEnum = pgEnum('audit_action', [
  'create',
  'update',
  'delete',
]);

// ─── Audit Logs ───────────────────────────────────────────────────────────────
// Tabel polimorfik: merekam perubahan data dari tabel manapun.
// Kolom table_name + record_id mengidentifikasi baris yang diaudit.
// old_data dan new_data menyimpan snapshot JSON sebelum/sesudah perubahan
// sehingga forensik data lengkap tanpa perlu join ke tabel asal.

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),

  // Nama tabel yang sedang diaudit: 'users', 'sales', 'expenses', dsb.
  tableName: varchar('table_name', { length: 100 }).notNull(),

  // Primary key dari record yang berubah di tabel tersebut
  recordId: integer('record_id').notNull(),

  action: auditActionEnum('action').notNull(),

  // Snapshot data sebelum perubahan (null untuk action 'create')
  oldData: jsonb('old_data'),

  // Snapshot data sesudah perubahan (null untuk action 'delete')
  newData: jsonb('new_data'),

  // User yang melakukan aksi; null jika dipicu oleh sistem/job
  performedBy: integer('performed_by').references(() => users.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuditLog = InferSelectModel<typeof auditLogs>;
export type NewAuditLog = InferInsertModel<typeof auditLogs>;
