import { FastifyInstance } from 'fastify';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

export async function inventoryRoutes(app: FastifyInstance) {
  const repo = new InventoryRepository(app.db);
  const service = new InventoryService(repo);
  const controller = new InventoryController(service);

  // Inventories
  app.get('/inventories', controller.getInventories.bind(controller));
  app.get('/inventories/:id', controller.getInventoryById.bind(controller));
  app.get('/stalls/:stallId/inventories', controller.getInventoriesByStall.bind(controller));
  app.post('/inventories', controller.createInventory.bind(controller));
  app.patch('/inventories/:id', controller.updateInventory.bind(controller));

  // Inventory Mutations
  app.get('/inventory-mutations', controller.getMutations.bind(controller));
  app.get('/inventory-mutations/:id', controller.getMutationById.bind(controller));
  app.get('/inventory-mutations/:mutationId/items', controller.getMutationItems.bind(controller));
  app.post('/inventory-mutations', controller.createMutation.bind(controller));

  // Mutation Items
  app.post('/inventory-mutation-items', controller.createMutationItem.bind(controller));
}
