import fp from 'fastify-plugin';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { FastifyInstance } from 'fastify';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { createPool } from '../config/db';
import * as userSchema from '../database/schema/user';
import * as stallsSchema from '../database/schema/stalls';
import * as productSchema from '../database/schema/products';
import * as supplierSchema from '../database/schema/suppliers';
import * as inventorySchema from '../database/schema/inventory';
import * as salesSchema from '../database/schema/sales';
import * as employeesSchema from '../database/schema/employees';
import * as financeSchema from '../database/schema/finance';
import * as auditLogSchema from '../database/schema/audit_log';

// ─── Gabungan seluruh schema ──────────────────────────────────────────────────

export const schema = {
  ...userSchema,
  ...stallsSchema,
  ...productSchema,
  ...supplierSchema,
  ...inventorySchema,
  ...salesSchema,
  ...employeesSchema,
  ...financeSchema,
  ...auditLogSchema,
};

export type Schema = typeof schema;
export type Database = NodePgDatabase<Schema>;

// ─── Type augmentation Fastify ────────────────────────────────────────────────

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
  }
}

// ─── Plugin ───────────────────────────────────────────────────────────────────

async function drizzlePlugin(fastify: FastifyInstance): Promise<void> {
  const pool = createPool(fastify.config.DATABASE_URL);

  // Verifikasi koneksi saat startup
  await pool.query('SELECT 1');

  const db = drizzle(pool, { schema });

  fastify.decorate('db', db);

  fastify.addHook('onClose', async () => {
    await pool.end();
  });
}

export default fp(drizzlePlugin, {
  name: 'drizzle',
  dependencies: ['@fastify/env'],
});
