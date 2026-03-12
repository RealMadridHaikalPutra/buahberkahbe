/**
 * Format a Date object to 'YYYY-MM-DD'.
 */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Return today's date as 'YYYY-MM-DD'.
 */
export function today(): string {
  return toDateString(new Date());
}

/**
 * Parse a 'YYYY-MM-DD' string to a Date at midnight UTC.
 */
export function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

/**
 * Check whether a string is a valid date.
 */
export function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}
