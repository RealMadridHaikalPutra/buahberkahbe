import { FastifyRequest, FastifyReply } from 'fastify';
import { FinanceService } from './finance.service';

export class SalaryController {
  constructor(private service: FinanceService) {}

  async getSalaryCashflows(req: FastifyRequest, reply: FastifyReply) {
    const cashflows = await this.service.getCashflowsBySourceType('salary_payments');
    return reply.send(cashflows);
  }

  async createSalaryCashflow(req: FastifyRequest, reply: FastifyReply) {
    const cashflow = await this.service.createCashflow({
      ...(req.body as object),
      sourceType: 'salary_payments',
      type: 'expense',
    });
    return reply.status(201).send(cashflow);
  }
}
