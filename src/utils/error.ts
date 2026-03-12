import type { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  // Zod validation errors
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      issues: error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      })),
    });
  }

  const msg = error.message ?? 'Internal Server Error';

  if (/not found/i.test(msg)) {
    return reply.status(404).send({ statusCode: 404, error: 'Not Found', message: msg });
  }

  if (/unauthorized|invalid.*token/i.test(msg)) {
    return reply.status(401).send({ statusCode: 401, error: 'Unauthorized', message: msg });
  }

  if (/forbidden|insufficient/i.test(msg)) {
    return reply.status(403).send({ statusCode: 403, error: 'Forbidden', message: msg });
  }

  if (/already taken|duplicate/i.test(msg)) {
    return reply.status(409).send({ statusCode: 409, error: 'Conflict', message: msg });
  }

  req.log.error(error);
  return reply.status(500).send({ statusCode: 500, error: 'Internal Server Error', message: msg });
}
