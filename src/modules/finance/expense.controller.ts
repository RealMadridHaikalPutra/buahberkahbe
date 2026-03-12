import { FastifyRequest, FastifyReply } from 'fastify';
import { FinanceService } from './finance.service';

export class ExpenseController {
  constructor(private service: FinanceService) {}

  // ─── Expenses ──────────────────────────────────────────────────────────────────

  async createExpense(req: FastifyRequest, reply: FastifyReply) {
    const expense = await this.service.createExpense(req.body);
    return reply.status(201).send(expense);
  }

  async getExpenses(req: FastifyRequest, reply: FastifyReply) {
    const expenses = await this.service.getAllExpenses();
    return reply.send(expenses);
  }

  async getExpenseById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const expense = await this.service.getExpenseById(Number(id));
    return reply.send(expense);
  }

  async getExpensesByStall(req: FastifyRequest, reply: FastifyReply) {
    const { stallId } = req.params as { stallId: string };
    const expenses = await this.service.getExpensesByStallId(Number(stallId));
    return reply.send(expenses);
  }

  async updateExpense(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const expense = await this.service.updateExpense(Number(id), req.body);
    return reply.send(expense);
  }

  // ─── Cashflows ────────────────────────────────────────────────────────────────

  async createCashflow(req: FastifyRequest, reply: FastifyReply) {
    const cashflow = await this.service.createCashflow(req.body);
    return reply.status(201).send(cashflow);
  }

  async getCashflows(req: FastifyRequest, reply: FastifyReply) {
    const cashflows = await this.service.getAllCashflows();
    return reply.send(cashflows);
  }

  async getCashflowById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const cashflow = await this.service.getCashflowById(Number(id));
    return reply.send(cashflow);
  }

  async getCashflowsByStall(req: FastifyRequest, reply: FastifyReply) {
    const { stallId } = req.params as { stallId: string };
    const cashflows = await this.service.getCashflowsByStallId(Number(stallId));
    return reply.send(cashflows);
  }
}
