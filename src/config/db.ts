import { Pool } from 'pg';

// ─── PostgreSQL Connection Pool ───────────────────────────────────────────────
// Pool dibuat tanpa DATABASE_URL agar dapat diinisialisasi setelah @fastify/env
// memvalidasi variabel lingkungan. Gunakan fungsi createPool() dan simpan
// hasilnya di drizzle plugin, bukan di level modul.

export function createPool(connectionString: string): Pool {
  return new Pool({ connectionString });
}

export type { Pool };
