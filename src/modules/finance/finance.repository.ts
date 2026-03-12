import { eq } from 'drizzle-orm';
import { expenses, cashflows } from '../../database/schema/finance';
import type { NewExpense, NewCashflow } from '../../database/schema/finance';
import type { Database } from '../../plugins/drizzle';

export class FinanceRepository {
  constructor(private db: Database) {}

  // ─── Expenses ──────────────────────────────────────────────────────────────────

  async createExpense(data: NewExpense) {
    const [expense] = await this.db.insert(expenses).values(data).returning();
    return expense;
  }

  async getAllExpenses() {
    return this.db.select().from(expenses);
  }

  async getExpenseById(id: number) {
    const [expense] = await this.db
      .select()
      .from(expenses)
      .where(eq(expenses.id, id));
    return expense ?? null;
  }

  async getExpensesByStallId(stallId: number) {
    return this.db
      .select()
      .from(expenses)
      .where(eq(expenses.stallId, stallId));
  }

  async updateExpense(id: number, data: Partial<NewExpense>) {
    const [updated] = await this.db
      .update(expenses)
      .set(data)
      .where(eq(expenses.id, id))
      .returning();
    return updated;
  }

  // ─── Cashflows ────────────────────────────────────────────────────────────────

  async createCashflow(data: NewCashflow) {
    const [cashflow] = await this.db.insert(cashflows).values(data).returning();
    return cashflow;
  }

  async getAllCashflows() {
    return this.db.select().from(cashflows);
  }

  async getCashflowById(id: number) {
    const [cashflow] = await this.db
      .select()
      .from(cashflows)
      .where(eq(cashflows.id, id));
    return cashflow ?? null;
  }

  async getCashflowsByStallId(stallId: number) {
    return this.db
      .select()
      .from(cashflows)
      .where(eq(cashflows.stallId, stallId));
  }

  async getCashflowsBySourceType(sourceType: NewCashflow['sourceType']) {
    return this.db
      .select()
      .from(cashflows)
      .where(eq(cashflows.sourceType, sourceType));
  }
}
