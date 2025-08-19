import { test, expect } from '@playwright/test';

test.describe('Basic Navigation Tests', () => {
  test('Desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Check if page loads
    await expect(page).toHaveURL('/dashboard');

    // Check if desktop sidebar is visible
    await expect(page.getByTestId('desktop-sidebar')).toBeVisible();

    // Check if mobile menu button is hidden
    await expect(page.getByTestId('mobile-menu-button')).not.toBeVisible();
  });

  test('Mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Check if page loads
    await expect(page).toHaveURL('/dashboard');

    // Check if mobile menu button is visible
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    // Check if desktop sidebar is hidden
    await expect(page.getByTestId('desktop-sidebar')).not.toBeVisible();
  });
});
