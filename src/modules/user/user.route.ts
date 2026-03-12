import { FastifyInstance } from 'fastify';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

export async function userRoutes(app: FastifyInstance) {
  const repo = new UserRepository(app.db);
  const service = new UserService(repo);
  const controller = new UserController(service);

  app.get('/users', controller.getUsers.bind(controller));
  app.get('/users/:id', controller.getUserById.bind(controller));
  app.post('/users', controller.createUser.bind(controller));
  app.patch('/users/:id', controller.updateUser.bind(controller));
  app.delete('/users/:id', controller.deleteUser.bind(controller));
}
