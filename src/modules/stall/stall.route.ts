import { FastifyInstance } from 'fastify';
import { StallRepository } from './stall.repository';
import { StallService } from './stall.service';
import { StallController } from './stall.controller';

export async function stallRoutes(app: FastifyInstance) {
  const repo = new StallRepository(app.db);
  const service = new StallService(repo);
  const controller = new StallController(service);

  app.get('/stalls', controller.getStalls.bind(controller));
  app.get('/stalls/:id', controller.getStallById.bind(controller));
  app.post('/stalls', controller.createStall.bind(controller));
  app.patch('/stalls/:id', controller.updateStall.bind(controller));
  app.delete('/stalls/:id', controller.deleteStall.bind(controller));
}
