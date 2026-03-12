import { FastifyInstance } from "fastify";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

export async function productRoutes(app: FastifyInstance) {

  const repo = new ProductRepository(app.db);
  const service = new ProductService(repo);
  const controller = new ProductController(service);

  // Products
  app.get("/products", controller.getProducts.bind(controller));
  app.get("/products/:id", controller.getProductById.bind(controller));
  app.post("/products", controller.createProduct.bind(controller));
  app.patch("/products/:id", controller.updateProduct.bind(controller));

  // Variants
  app.get("/products/:productId/variants", controller.getVariants.bind(controller));
  app.post("/variants", controller.createVariant.bind(controller));
  app.patch("/variants/:id", controller.updateVariant.bind(controller));

  // Units
  app.get("/units", controller.getUnits.bind(controller));
  app.post("/units", controller.createUnit.bind(controller));
  app.patch("/units/:id", controller.updateUnit.bind(controller));

  // Prices
  app.get("/variants/:variantId/prices", controller.getPrices.bind(controller));
  app.post("/prices", controller.createPrice.bind(controller));
  app.patch("/prices/:id", controller.updatePrice.bind(controller));
}