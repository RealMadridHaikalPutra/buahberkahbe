import type { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import type { JwtPayload } from '../../types';

export class AuthController {
  constructor(private service: AuthService) {}

  async login(req: FastifyRequest, reply: FastifyReply) {
    const result = await this.service.login(req.body);
    return reply.send(result);
  }

  async register(req: FastifyRequest, reply: FastifyReply) {
    const user = await this.service.register(req.body);
    return reply.status(201).send(user);
  }

  async me(req: FastifyRequest, reply: FastifyReply) {
    const payload = req.user as JwtPayload;
    const user = await this.service.me(payload.sub);
    return reply.send(user);
  }
}
