import { eq } from 'drizzle-orm';
import { employees, salaryPayments } from '../../database/schema/employees';
import type { NewEmployee, NewSalaryPayment } from '../../database/schema/employees';
import type { Database } from '../../plugins/drizzle';

export class EmployeeRepository {
  constructor(private db: Database) {}

  // ─── Employees ────────────────────────────────────────────────────────────────

  async createEmployee(data: NewEmployee) {
    const [employee] = await this.db.insert(employees).values(data).returning();
    return employee;
  }

  async getAllEmployees() {
    return this.db.select().from(employees);
  }

  async getEmployeeById(id: number) {
    const [employee] = await this.db
      .select()
      .from(employees)
      .where(eq(employees.id, id));
    return employee ?? null;
  }

  async getEmployeesByStallId(stallId: number) {
    return this.db
      .select()
      .from(employees)
      .where(eq(employees.stallId, stallId));
  }

  async updateEmployee(id: number, data: Partial<NewEmployee>) {
    const [updated] = await this.db
      .update(employees)
      .set(data)
      .where(eq(employees.id, id))
      .returning();
    return updated;
  }

  // ─── Salary Payments ────────────────────────────────────────────────────────

  async createSalaryPayment(data: NewSalaryPayment) {
    const [payment] = await this.db.insert(salaryPayments).values(data).returning();
    return payment;
  }

  async getAllSalaryPayments() {
    return this.db.select().from(salaryPayments);
  }

  async getSalaryPaymentsByEmployeeId(employeeId: number) {
    return this.db
      .select()
      .from(salaryPayments)
      .where(eq(salaryPayments.employeeId, employeeId));
  }
}
