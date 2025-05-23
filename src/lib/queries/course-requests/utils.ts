
/**
 * Helper function to validate UUID format
 */
export function isValidUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

/**
 * Helper function to escape CSV strings
 */
export function escapeCSV(str: string): string {
  return `"${str.replace(/"/g, '""')}"`;
}
