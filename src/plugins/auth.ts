import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import type { FastifyInstance } from 'fastify';

async function authPlugin(fastify: FastifyInstance): Promise<void> {
  fastify.register(jwt, {
    secret: fastify.config.JWT_SECRET,
  });
}

export default fp(authPlugin, {
  name: 'auth',
  dependencies: ['@fastify/env'],
});
