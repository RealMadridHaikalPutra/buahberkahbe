import Fastify from 'fastify';
import env from '@fastify/env';
import { envSchema } from './config/env';

// ─── Plugins ──────────────────────────────────────────────────────────────────

import drizzlePlugin from './plugins/drizzle';
import corsPlugin from './plugins/cors';
import authPlugin from './plugins/auth';

// ─── Utils ──────────────────────────────────────────────────────────────────

import { errorHandler } from './utils/error';

// ─── Routes ──────────────────────────────────────────────────────────────────

import { authRoutes } from './modules/auth/auth.route';
import { productRoutes } from './modules/product/product.route';
import { stallRoutes } from './modules/stall/stall.route';
import { supplierRoutes } from './modules/supplier/supplier.route';
import { inventoryRoutes } from './modules/inventory/inventory.route';
import { employeeRoutes } from './modules/employee/employee.route';
import { financeRoutes } from './modules/finance/finance.route';
import { salesRoutes } from './modules/sales/sales.route';
import { userRoutes } from './modules/user/user.route';

// ─── Builder ─────────────────────────────────────────────────────────────────

export async function buildApp() {
  const app = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  // ── 1. Environment variables (must be first – other plugins depend on it)
  await app.register(env, { schema: envSchema, dotenv: true });

  // ── 2. Core infrastructure plugins
  app.register(corsPlugin);
  app.register(drizzlePlugin);
  app.register(authPlugin);

  // ── 3. Global error handler
  app.setErrorHandler(errorHandler);

  // ── 4. API routes
  const prefix = '/api';
  app.register(authRoutes,      { prefix });
  app.register(productRoutes,   { prefix });
  app.register(stallRoutes,     { prefix });
  app.register(supplierRoutes,  { prefix });
  app.register(inventoryRoutes, { prefix });
  app.register(employeeRoutes,  { prefix });
  app.register(financeRoutes,   { prefix });
  app.register(salesRoutes,     { prefix });
  app.register(userRoutes,      { prefix });

  return app;
}
