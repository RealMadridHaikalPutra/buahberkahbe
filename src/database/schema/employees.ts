import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  timestamp,
  date,
  text,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { stalls } from './stalls';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const employeeTypeEnum = pgEnum('employee_type', [
  'stall_worker',
  'loader'
]);

export const salaryTypeEnum = pgEnum('salary_type', [
  'monthly',
  'daily',
  'weekly',
]);

// ─── Employees ────────────────────────────────────────────────────────────────

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: employeeTypeEnum('type').notNull(),
  stallId: integer('stall_id')
    .notNull()
    .references(() => stalls.id, { onDelete: 'restrict' }),
  salaryType: salaryTypeEnum('salary_type').notNull(),
  salaryAmount: numeric('salary_amount', { precision: 15, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Salary Payments ──────────────────────────────────────────────────────────

export const salaryPayments = pgTable('salary_payments', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id, { onDelete: 'restrict' }),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  paymentDate: date('payment_date').notNull(),
  note: text('note'),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Employee = InferSelectModel<typeof employees>;
export type NewEmployee = InferInsertModel<typeof employees>;

export type SalaryPayment = InferSelectModel<typeof salaryPayments>;
export type NewSalaryPayment = InferInsertModel<typeof salaryPayments>;
