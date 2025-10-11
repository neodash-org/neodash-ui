import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a blockchain address for display. If the address is long and
// truncation is desired (e.g., on mobile), it keeps the first `left` and
// last `right` characters separated by an ellipsis.
export function formatAddress(
  address: string,
  options: { truncate?: boolean; left?: number; right?: number } = {},
): string {
  const { truncate = false, left = 8, right = 8 } = options;
  if (!address) return '';
  if (!truncate) return address;
  if (address.length <= left + right + 3) return address;
  const start = address.slice(0, left);
  const end = address.slice(-right);
  return `${start}...${end}`;
}
