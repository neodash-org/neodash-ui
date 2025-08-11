import { describe, it, expect, vi } from 'vitest';
import { redirect } from 'next/navigation';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Home', () => {
  it('redirects to dashboard', () => {
    // Import and execute the Home component
    import('./page');

    // Verify that redirect was called with '/dashboard'
    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });
});
