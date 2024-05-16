export function formatCurrency(value: string): string {
  const valueAsString: string = value?.toString();
  return `$${parseFloat(valueAsString).toFixed(2)}`;
}
