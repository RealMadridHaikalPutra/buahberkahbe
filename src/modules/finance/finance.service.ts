import { FinanceRepository } from './finance.repository';
import {
  createExpenseSchema,
  updateExpenseSchema,
  createCashflowSchema,
  type CreateExpenseInput,
  type UpdateExpenseInput,
  type CreateCashflowInput,
} from './finance.schema';
import type { Expense, Cashflow, NewCashflow } from '../../database/schema/finance';

const VALID_SOURCE_TYPES = [
  'sales',
  'expenses',
  'salary_payments',
  'supplier_orders',
  'manual',
] as const;

export class FinanceService {
  constructor(private repo: FinanceRepository) {}

  // ─── Expenses ──────────────────────────────────────────────────────────────────

  async createExpense(data: unknown): Promise<Expense> {
    const parsed: CreateExpenseInput = createExpenseSchema.parse(data);
    const expense = await this.repo.createExpense(parsed);
    if (!expense) throw new Error('Failed to create expense');
    return expense;
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.repo.getAllExpenses();
  }

  async getExpenseById(id: number): Promise<Expense> {
    const expense = await this.repo.getExpenseById(id);
    if (!expense) throw new Error('Expense not found');
    return expense;
  }

  async getExpensesByStallId(stallId: number): Promise<Expense[]> {
    return this.repo.getExpensesByStallId(stallId);
  }

  async updateExpense(id: number, data: unknown): Promise<Expense> {
    const parsed: UpdateExpenseInput = updateExpenseSchema.parse(data);
    const expense = await this.repo.updateExpense(id, parsed);
    if (!expense) throw new Error('Expense not found');
    return expense;
  }

  // ─── Cashflows ────────────────────────────────────────────────────────────────

  async createCashflow(data: unknown): Promise<Cashflow> {
    const parsed: CreateCashflowInput = createCashflowSchema.parse(data);
    const cashflow = await this.repo.createCashflow(parsed);
    if (!cashflow) throw new Error('Failed to create cashflow');
    return cashflow;
  }

  async getAllCashflows(): Promise<Cashflow[]> {
    return this.repo.getAllCashflows();
  }

  async getCashflowById(id: number): Promise<Cashflow> {
    const cashflow = await this.repo.getCashflowById(id);
    if (!cashflow) throw new Error('Cashflow not found');
    return cashflow;
  }

  async getCashflowsByStallId(stallId: number): Promise<Cashflow[]> {
    return this.repo.getCashflowsByStallId(stallId);
  }

  async getCashflowsBySourceType(sourceType: string): Promise<Cashflow[]> {
    if (!VALID_SOURCE_TYPES.includes(sourceType as NewCashflow['sourceType'])) {
      throw new Error('Invalid source type');
    }
    return this.repo.getCashflowsBySourceType(sourceType as NewCashflow['sourceType']);
  }
}
