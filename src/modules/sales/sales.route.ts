import { FastifyInstance } from 'fastify';
import { SalesRepository } from './sales.repository';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

export async function salesRoutes(app: FastifyInstance) {
  const repo = new SalesRepository(app.db);
  const service = new SalesService(repo);
  const controller = new SalesController(service);

  // Sales
  app.get('/sales', controller.getSales.bind(controller));
  app.get('/sales/:id', controller.getSaleById.bind(controller));
  app.get('/sales/:saleId/items', controller.getSaleItems.bind(controller));
  app.get('/stalls/:stallId/sales', controller.getSalesByStall.bind(controller));
  app.post('/sales', controller.createSale.bind(controller));
  app.patch('/sales/:id', controller.updateSale.bind(controller));

  // Sale Items
  app.post('/sale-items', controller.createSaleItem.bind(controller));
}
