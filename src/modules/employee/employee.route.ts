import { FastifyInstance } from 'fastify';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

export async function employeeRoutes(app: FastifyInstance) {
  const repo = new EmployeeRepository(app.db);
  const service = new EmployeeService(repo);
  const controller = new EmployeeController(service);

  // Employees
  app.get('/employees', controller.getEmployees.bind(controller));
  app.get('/employees/:id', controller.getEmployeeById.bind(controller));
  app.get('/stalls/:stallId/employees', controller.getEmployeesByStall.bind(controller));
  app.post('/employees', controller.createEmployee.bind(controller));
  app.patch('/employees/:id', controller.updateEmployee.bind(controller));

  // Salary Payments
  app.get('/salary-payments', controller.getSalaryPayments.bind(controller));
  app.get('/employees/:employeeId/salary-payments', controller.getSalaryPaymentsByEmployee.bind(controller));
  app.post('/salary-payments', controller.createSalaryPayment.bind(controller));
}
