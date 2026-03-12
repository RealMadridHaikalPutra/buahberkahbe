import { FastifyRequest, FastifyReply } from 'fastify';
import { SalesService } from './sales.service';

export class SalesController {
  constructor(private service: SalesService) {}

  // ─── Sales ───────────────────────────────────────────────────────────────────

  async createSale(req: FastifyRequest, reply: FastifyReply) {
    const sale = await this.service.createSale(req.body);
    return reply.status(201).send(sale);
  }

  async getSales(req: FastifyRequest, reply: FastifyReply) {
    const sales = await this.service.getAllSales();
    return reply.send(sales);
  }

  async getSaleById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const sale = await this.service.getSaleById(Number(id));
    return reply.send(sale);
  }

  async getSalesByStall(req: FastifyRequest, reply: FastifyReply) {
    const { stallId } = req.params as { stallId: string };
    const sales = await this.service.getSalesByStallId(Number(stallId));
    return reply.send(sales);
  }

  async updateSale(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const sale = await this.service.updateSale(Number(id), req.body);
    return reply.send(sale);
  }

  // ─── Sale Items ────────────────────────────────────────────────────────────

  async createSaleItem(req: FastifyRequest, reply: FastifyReply) {
    const item = await this.service.createSaleItem(req.body);
    return reply.status(201).send(item);
  }

  async getSaleItems(req: FastifyRequest, reply: FastifyReply) {
    const { saleId } = req.params as { saleId: string };
    const items = await this.service.getSaleItemsBySaleId(Number(saleId));
    return reply.send(items);
  }
}
