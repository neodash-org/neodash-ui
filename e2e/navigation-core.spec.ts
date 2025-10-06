import { test, expect } from '@playwright/test';

test.describe('Core Navigation Tests', () => {
  test('Desktop layout shows sidebar and hides mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Desktop sidebar should be visible
    await expect(page.getByTestId('desktop-sidebar')).toBeVisible();

    // Mobile menu button should be hidden
    await expect(page.getByTestId('mobile-menu-button')).not.toBeVisible();

    // Page title should be hidden on desktop (it's in the header)
    await expect(page.getByTestId('page-title')).not.toBeVisible();
  });

  test('Mobile layout shows mobile menu button and hides sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Mobile menu button should be visible
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    // Desktop sidebar should be hidden
    await expect(page.getByTestId('desktop-sidebar')).not.toBeVisible();

    // Page title should be visible
    await expect(page.getByTestId('page-title')).toBeVisible();
  });

  test('Mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Mobile menu should be closed initially
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();

    // Open mobile menu
    await page.getByTestId('mobile-menu-button').click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Close mobile menu
    await page.getByTestId('mobile-menu-close').click();
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });

  test('Desktop sidebar toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Sidebar should be expanded initially
    await expect(page.getByTestId('desktop-sidebar')).toHaveClass(/w-\[190px\]/);

    // Click toggle button
    await page.getByTestId('sidebar-toggle-button').click();

    // Sidebar should be collapsed
    await expect(page.getByTestId('desktop-sidebar')).toHaveClass(/w-16/);

    // Click again to expand
    await page.getByTestId('sidebar-toggle-button').click();

    // Sidebar should be expanded again
    await expect(page.getByTestId('desktop-sidebar')).toHaveClass(/w-\[190px\]/);
  });

  test('Responsive behavior works', async ({ page }) => {
    // Start with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Should show mobile layout
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();
    await expect(page.getByTestId('desktop-sidebar')).not.toBeVisible();

    // Resize to desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    // Should show desktop layout
    await expect(page.getByTestId('mobile-menu-button')).not.toBeVisible();
    await expect(page.getByTestId('desktop-sidebar')).toBeVisible();
  });

  test('Header elements are properly positioned', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Theme toggle should be visible on desktop
    await expect(page.getByTestId('theme-toggle')).toBeVisible();

    // Notification icon should be visible
    await expect(page.getByTestId('notification-icon')).toBeVisible();

    // Connect wallet button should be visible
    await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
  });

  test('Mobile header elements are properly positioned', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Mobile menu button should be visible
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    // Notification icon should be visible
    await expect(page.getByTestId('notification-icon')).toBeVisible();

    // Mobile wallet icon should be visible in header (not in mobile menu)
    await expect(page.getByTestId('mobile-wallet-icon')).toBeVisible();
  });
});
