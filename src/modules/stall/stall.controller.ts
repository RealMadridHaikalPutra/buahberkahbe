import { FastifyRequest, FastifyReply } from 'fastify';
import { StallService } from './stall.service';

export class StallController {
  constructor(private service: StallService) {}

  async createStall(req: FastifyRequest, reply: FastifyReply) {
    const stall = await this.service.createStall(req.body);
    return reply.status(201).send(stall);
  }

  async getStalls(req: FastifyRequest, reply: FastifyReply) {
    const stalls = await this.service.getAllStalls();
    return reply.send(stalls);
  }

  async getStallById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const stall = await this.service.getStallById(Number(id));
    return reply.send(stall);
  }

  async updateStall(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const stall = await this.service.updateStall(Number(id), req.body);
    return reply.send(stall);
  }

  async deleteStall(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const stall = await this.service.deleteStall(Number(id));
    return reply.send(stall);
  }
}
