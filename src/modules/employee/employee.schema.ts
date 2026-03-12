import z from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  type: z.enum(['stall_worker', 'loader']),
  stallId: z.number(),
  salaryType: z.enum(['monthly', 'daily', 'weekly']),
  salaryAmount: z.number().positive("Salary amount must be positive").transform(v => v.toString()),
});

export const createSalaryPaymentSchema = z.object({
  employeeId: z.number(),
  amount: z.number().positive("Amount must be positive").transform(v => v.toString()),
  paymentDate: z.string().min(1, "Payment date is required"),
  note: z.string().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();
export const updateSalaryPaymentSchema = createSalaryPaymentSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;

export type CreateSalaryPaymentInput = z.infer<typeof createSalaryPaymentSchema>;
export type UpdateSalaryPaymentInput = z.infer<typeof updateSalaryPaymentSchema>;
