import { FastifyRequest, FastifyReply } from 'fastify';
import { SupplierService } from './supplier.service';

export class SupplierController {
  constructor(private service: SupplierService) {}

  // ─── Suppliers ──────────────────────────────────────────────────────────────

  async createSupplier(req: FastifyRequest, reply: FastifyReply) {
    const supplier = await this.service.createSupplier(req.body);
    return reply.status(201).send(supplier);
  }

  async getSuppliers(req: FastifyRequest, reply: FastifyReply) {
    const suppliers = await this.service.getAllSuppliers();
    return reply.send(suppliers);
  }

  async getSupplierById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const supplier = await this.service.getSupplierById(Number(id));
    return reply.send(supplier);
  }

  async updateSupplier(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const supplier = await this.service.updateSupplier(Number(id), req.body);
    return reply.send(supplier);
  }

  // ─── Supplier Orders ──────────────────────────────────────────────────────────

  async createSupplierOrder(req: FastifyRequest, reply: FastifyReply) {
    const order = await this.service.createSupplierOrder(req.body);
    return reply.status(201).send(order);
  }

  async getSupplierOrders(req: FastifyRequest, reply: FastifyReply) {
    const orders = await this.service.getAllSupplierOrders();
    return reply.send(orders);
  }

  async getSupplierOrderById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const order = await this.service.getSupplierOrderById(Number(id));
    return reply.send(order);
  }

  async getOrdersBySupplierId(req: FastifyRequest, reply: FastifyReply) {
    const { supplierId } = req.params as { supplierId: string };
    const orders = await this.service.getOrdersBySupplierId(Number(supplierId));
    return reply.send(orders);
  }

  async updateSupplierOrder(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const order = await this.service.updateSupplierOrder(Number(id), req.body);
    return reply.send(order);
  }

  async updateOrderItem(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const item = await this.service.updateSupplierOrderItem(Number(id), req.body);
    return reply.send(item);
  }

  async getOrderItems(req: FastifyRequest, reply: FastifyReply) {
    const { orderId } = req.params as { orderId: string };
    const items = await this.service.getItemsByOrderId(Number(orderId));
    return reply.send(items);
  }
}
