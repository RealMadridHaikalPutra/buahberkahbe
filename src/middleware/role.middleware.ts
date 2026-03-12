import type { FastifyRequest, FastifyReply } from 'fastify';
import type { JwtPayload } from '../types';

/**
 * Returns a prehandler hook that allows only the specified roles.
 * Must be used AFTER the `authenticate` hook.
 *
 * @example
 * app.get('/admin', { preHandler: [authenticate, requireRole('admin')] }, handler)
 */
export function requireRole(...roles: Array<JwtPayload['role']>) {
  return async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = req.user as JwtPayload;
    if (!roles.includes(user.role)) {
      reply.status(403).send({
        statusCode: 403,
        error: 'Forbidden',
        message: 'Insufficient permissions',
      });
    }
  };
}

