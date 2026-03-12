import { EmployeeRepository } from './employee.repository';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  createSalaryPaymentSchema,
  type CreateEmployeeInput,
  type UpdateEmployeeInput,
  type CreateSalaryPaymentInput,
} from './employee.schema';
import type { Employee, SalaryPayment } from '../../database/schema/employees';

export class EmployeeService {
  constructor(private repo: EmployeeRepository) {}

  // ─── Employees ────────────────────────────────────────────────────────────────

  async createEmployee(data: unknown): Promise<Employee> {
    const parsed: CreateEmployeeInput = createEmployeeSchema.parse(data);
    const employee = await this.repo.createEmployee(parsed);
    if (!employee) throw new Error('Failed to create employee');
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.repo.getAllEmployees();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.repo.getEmployeeById(id);
    if (!employee) throw new Error('Employee not found');
    return employee;
  }

  async getEmployeesByStallId(stallId: number): Promise<Employee[]> {
    return this.repo.getEmployeesByStallId(stallId);
  }

  async updateEmployee(id: number, data: unknown): Promise<Employee> {
    const parsed: UpdateEmployeeInput = updateEmployeeSchema.parse(data);
    const employee = await this.repo.updateEmployee(id, parsed);
    if (!employee) throw new Error('Employee not found');
    return employee;
  }

  // ─── Salary Payments ────────────────────────────────────────────────────────

  async createSalaryPayment(data: unknown): Promise<SalaryPayment> {
    const parsed: CreateSalaryPaymentInput = createSalaryPaymentSchema.parse(data);
    const payment = await this.repo.createSalaryPayment(parsed);
    if (!payment) throw new Error('Failed to create salary payment');
    return payment;
  }

  async getAllSalaryPayments(): Promise<SalaryPayment[]> {
    return this.repo.getAllSalaryPayments();
  }

  async getSalaryPaymentsByEmployeeId(employeeId: number): Promise<SalaryPayment[]> {
    return this.repo.getSalaryPaymentsByEmployeeId(employeeId);
  }
}
