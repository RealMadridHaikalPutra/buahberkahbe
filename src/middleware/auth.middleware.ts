import type { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Prehandler hook – verifies the Bearer JWT.
 * Attach to any route that requires authentication.
 */
export async function authenticate(
  req: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    await req.jwtVerify();
  } catch {
    reply.status(401).send({ statusCode: 401, error: 'Unauthorized', message: 'Invalid or missing token' });
  }
}

