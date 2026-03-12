import { FastifyRequest, FastifyReply } from 'fastify';
import { InventoryService } from './inventory.service';

export class InventoryController {
  constructor(private service: InventoryService) {}

  // ─── Inventories ──────────────────────────────────────────────────────────────

  async createInventory(req: FastifyRequest, reply: FastifyReply) {
    const inventory = await this.service.createInventory(req.body);
    return reply.status(201).send(inventory);
  }

  async getInventories(req: FastifyRequest, reply: FastifyReply) {
    const inventories = await this.service.getAllInventories();
    return reply.send(inventories);
  }

  async getInventoryById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const inventory = await this.service.getInventoryById(Number(id));
    return reply.send(inventory);
  }

  async getInventoriesByStall(req: FastifyRequest, reply: FastifyReply) {
    const { stallId } = req.params as { stallId: string };
    const inventories = await this.service.getInventoriesByStallId(Number(stallId));
    return reply.send(inventories);
  }

  async updateInventory(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const inventory = await this.service.updateInventory(Number(id), req.body);
    return reply.send(inventory);
  }

  // ─── Inventory Mutations ───────────────────────────────────────────────────────

  async createMutation(req: FastifyRequest, reply: FastifyReply) {
    const mutation = await this.service.createInventoryMutation(req.body);
    return reply.status(201).send(mutation);
  }

  async getMutations(req: FastifyRequest, reply: FastifyReply) {
    const mutations = await this.service.getAllInventoryMutations();
    return reply.send(mutations);
  }

  async getMutationById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const mutation = await this.service.getInventoryMutationById(Number(id));
    return reply.send(mutation);
  }

  // ─── Mutation Items ─────────────────────────────────────────────────────────────

  async createMutationItem(req: FastifyRequest, reply: FastifyReply) {
    const item = await this.service.createInventoryMutationItem(req.body);
    return reply.status(201).send(item);
  }

  async getMutationItems(req: FastifyRequest, reply: FastifyReply) {
    const { mutationId } = req.params as { mutationId: string };
    const items = await this.service.getMutationItemsByMutationId(Number(mutationId));
    return reply.send(items);
  }
}
