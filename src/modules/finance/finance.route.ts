import { FastifyInstance } from 'fastify';
import { FinanceRepository } from './finance.repository';
import { FinanceService } from './finance.service';
import { ExpenseController } from './expense.controller';
import { SalaryController } from './salary.controller';

export async function financeRoutes(app: FastifyInstance) {
  const repo = new FinanceRepository(app.db);
  const service = new FinanceService(repo);
  const expenseCtrl = new ExpenseController(service);
  const salaryCtrl = new SalaryController(service);

  // Expenses
  app.get('/expenses', expenseCtrl.getExpenses.bind(expenseCtrl));
  app.get('/expenses/:id', expenseCtrl.getExpenseById.bind(expenseCtrl));
  app.get('/stalls/:stallId/expenses', expenseCtrl.getExpensesByStall.bind(expenseCtrl));
  app.post('/expenses', expenseCtrl.createExpense.bind(expenseCtrl));
  app.patch('/expenses/:id', expenseCtrl.updateExpense.bind(expenseCtrl));

  // Salary Cashflows (register static routes before parameterized)
  app.get('/cashflows/salary', salaryCtrl.getSalaryCashflows.bind(salaryCtrl));
  app.post('/cashflows/salary', salaryCtrl.createSalaryCashflow.bind(salaryCtrl));

  // Cashflows
  app.get('/cashflows', expenseCtrl.getCashflows.bind(expenseCtrl));
  app.get('/cashflows/:id', expenseCtrl.getCashflowById.bind(expenseCtrl));
  app.get('/stalls/:stallId/cashflows', expenseCtrl.getCashflowsByStall.bind(expenseCtrl));
  app.post('/cashflows', expenseCtrl.createCashflow.bind(expenseCtrl));
}
