import { FastifyRequest, FastifyReply } from "fastify";
import { ProductService } from "./product.service";

export class ProductController {
  constructor(private service: ProductService) {}

  // ─── Products ─────────────────────────────

  async createProduct(req: FastifyRequest, reply: FastifyReply) {
    const product = await this.service.createProduct(req.body);
    return reply.send(product);
  }

  async getProducts(req: FastifyRequest, reply: FastifyReply) {
    const products = await this.service.getAllProducts();
    return reply.send(products);
  }

  async getProductById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const product = await this.service.getProductById(Number(id));
    return reply.send(product);
  }

  async updateProduct(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const product = await this.service.updateProduct(Number(id), req.body);
    return reply.send(product);
  }

  // ─── Variants ─────────────────────────────

  async createVariant(req: FastifyRequest, reply: FastifyReply) {
    const variant = await this.service.createVariant(req.body);
    return reply.send(variant);
  }

  async getVariants(req: FastifyRequest, reply: FastifyReply) {
    const { productId } = req.params as { productId: string };
    const variants = await this.service.getVariants(Number(productId));
    return reply.send(variants);
  }

  async updateVariant(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const variant = await this.service.updateVariant(Number(id), req.body);
    return reply.send(variant);
  }

  // ─── Units ────────────────────────────────

  async createUnit(req: FastifyRequest, reply: FastifyReply) {
    const unit = await this.service.createUnit(req.body);
    return reply.send(unit);
  }

  async getUnits(req: FastifyRequest, reply: FastifyReply) {
    const units = await this.service.getUnits();
    return reply.send(units);
  }

  async updateUnit(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const unit = await this.service.updateUnit(Number(id), req.body);
    return reply.send(unit);
  }

  // ─── Prices ───────────────────────────────

  async createPrice(req: FastifyRequest, reply: FastifyReply) {
    const price = await this.service.createPrice(req.body);
    return reply.send(price);
  }

  async getPrices(req: FastifyRequest, reply: FastifyReply) {
    const { variantId } = req.params as { variantId: string };
    const prices = await this.service.getPrices(Number(variantId));
    return reply.send(prices);
  }

  async updatePrice(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const price = await this.service.updatePrice(Number(id), req.body);
    return reply.send(price);
  }
}