import { FastifyRequest, FastifyReply } from 'fastify';
import { EmployeeService } from './employee.service';

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  // ─── Employees ──────────────────────────────────────────────────────────────

  async createEmployee(req: FastifyRequest, reply: FastifyReply) {
    const employee = await this.service.createEmployee(req.body);
    return reply.status(201).send(employee);
  }

  async getEmployees(req: FastifyRequest, reply: FastifyReply) {
    const employees = await this.service.getAllEmployees();
    return reply.send(employees);
  }

  async getEmployeeById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const employee = await this.service.getEmployeeById(Number(id));
    return reply.send(employee);
  }

  async getEmployeesByStall(req: FastifyRequest, reply: FastifyReply) {
    const { stallId } = req.params as { stallId: string };
    const employees = await this.service.getEmployeesByStallId(Number(stallId));
    return reply.send(employees);
  }

  async updateEmployee(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const employee = await this.service.updateEmployee(Number(id), req.body);
    return reply.send(employee);
  }

  // ─── Salary Payments ───────────────────────────────────────────────────────

  async createSalaryPayment(req: FastifyRequest, reply: FastifyReply) {
    const payment = await this.service.createSalaryPayment(req.body);
    return reply.status(201).send(payment);
  }

  async getSalaryPayments(req: FastifyRequest, reply: FastifyReply) {
    const payments = await this.service.getAllSalaryPayments();
    return reply.send(payments);
  }

  async getSalaryPaymentsByEmployee(req: FastifyRequest, reply: FastifyReply) {
    const { employeeId } = req.params as { employeeId: string };
    const payments = await this.service.getSalaryPaymentsByEmployeeId(Number(employeeId));
    return reply.send(payments);
  }
}
