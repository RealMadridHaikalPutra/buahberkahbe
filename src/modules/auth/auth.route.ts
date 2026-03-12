import type { FastifyInstance } from 'fastify';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

export async function authRoutes(app: FastifyInstance) {
  const repo = new UserRepository(app.db);
  const service = new AuthService(repo, app);
  const controller = new AuthController(service);

  app.post('/auth/login', controller.login.bind(controller));
  app.post('/auth/register', controller.register.bind(controller));
  app.get('/auth/me', { preHandler: authenticate }, controller.me.bind(controller));
}
