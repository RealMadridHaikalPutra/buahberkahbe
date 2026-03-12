import { FastifyInstance } from 'fastify';
import { SupplierRepository } from './supplier.repository';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

export async function supplierRoutes(app: FastifyInstance) {
  const repo = new SupplierRepository(app.db);
  const service = new SupplierService(repo);
  const controller = new SupplierController(service);

  // Suppliers
  app.get('/suppliers', controller.getSuppliers.bind(controller));
  app.get('/suppliers/:id', controller.getSupplierById.bind(controller));
  app.get('/suppliers/:supplierId/orders', controller.getOrdersBySupplierId.bind(controller));
  app.post('/suppliers', controller.createSupplier.bind(controller));
  app.patch('/suppliers/:id', controller.updateSupplier.bind(controller));

  // Supplier Orders
  app.get('/supplier-orders', controller.getSupplierOrders.bind(controller));
  app.get('/supplier-orders/:id', controller.getSupplierOrderById.bind(controller));
  app.get('/supplier-orders/:orderId/items', controller.getOrderItems.bind(controller));
  app.get('/supplier-orders/:orderId/deliveries', controller.getDeliveriesByOrderId.bind(controller));
  app.post('/supplier-orders', controller.createSupplierOrder.bind(controller));
  app.patch('/supplier-orders/:id', controller.updateSupplierOrder.bind(controller));

  // Supplier Order Items
  app.post('/supplier-order-items', controller.createSupplierOrderItem.bind(controller));

  // Supplier Deliveries
  app.post('/supplier-deliveries', controller.createSupplierDelivery.bind(controller));

  // Supplier Delivery Items
  app.get('/supplier-deliveries/:deliveryId/items', controller.getDeliveryItems.bind(controller));
  app.post('/supplier-delivery-items', controller.createSupplierDeliveryItem.bind(controller));
}
