import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

async function corsPlugin(fastify: FastifyInstance): Promise<void> {
  fastify.register(cors, {
    origin: fastify.config.NODE_ENV === 'production'
      ? false   // restrict in production – configure allowed origins here
      : true,   // allow all origins in development
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
}

export default fp(corsPlugin, {
  name: 'cors',
  dependencies: ['@fastify/env'],
});
