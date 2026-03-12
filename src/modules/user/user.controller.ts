import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from './user.service';

export class UserController {
  constructor(private service: UserService) {}

  async createUser(req: FastifyRequest, reply: FastifyReply) {
    const user = await this.service.createUser(req.body);
    return reply.status(201).send(user);
  }

  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    const users = await this.service.getAllUsers();
    return reply.send(users);
  }

  async getUserById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const user = await this.service.getUserById(Number(id));
    return reply.send(user);
  }

  async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const user = await this.service.updateUser(Number(id), req.body);
    return reply.send(user);
  }

  async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const user = await this.service.deleteUser(Number(id));
    return reply.send(user);
  }
}
