import type { FastifyInstance } from 'fastify';

// ─── Schema untuk @fastify/env ────────────────────────────────────────────────

export const envSchema = {
  type: 'object',
  required: ['DATABASE_URL', 'JWT_SECRET'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    DATABASE_URL: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
  },
} as const;

// ─── Tipe konfigurasi ─────────────────────────────────────────────────────────

export type EnvConfig = {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
};

// ─── Type augmentation Fastify ────────────────────────────────────────────────

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig;
  }
}
