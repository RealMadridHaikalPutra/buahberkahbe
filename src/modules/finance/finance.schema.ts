import z from "zod";

export const createExpenseSchema = z.object({
  stallId: z.number(),
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be positive").transform(v => v.toString()),
  description: z.string().optional(),
  createdBy: z.number(),
});

export const createCashflowSchema = z.object({
  stallId: z.number().optional(),
  type: z.enum(['income', 'expense']),
  amount: z.number().positive("Amount must be positive").transform(v => v.toString()),
  sourceType: z.enum(['sales', 'expenses', 'salary_payments', 'supplier_orders', 'manual']),
  sourceId: z.number().optional(),
  description: z.string().optional(),
  transactionDate: z.string().min(1, "Transaction date is required"),
  createdBy: z.number(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
export type CreateCashflowInput = z.infer<typeof createCashflowSchema>;
