import { test, expect } from '@playwright/test';

test.describe('UI Behavior and Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page
    await page.goto('/');
  });

  test('should toggle theme when clicking theme toggle button', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Get initial theme from the header theme toggle button
    const initialTheme = await page
      .locator('[data-testid="theme-toggle"]')
      .getAttribute('data-theme');
    console.log('Initial theme:', initialTheme);

    // Click theme toggle button in header
    await page.click('[data-testid="theme-toggle"]');

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify theme changed on the header button
    const newTheme = await page.locator('[data-testid="theme-toggle"]').getAttribute('data-theme');
    console.log('New theme:', newTheme);

    expect(newTheme).not.toBe(initialTheme);
    expect(['light', 'dark']).toContain(newTheme);
  });

  test('should open mobile menu when clicking mobile menu button', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Mobile menu should be closed initially
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();

    // Click mobile menu button
    await page.click('[data-testid="mobile-menu-button"]');

    // Mobile menu should be visible
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });

  test('should close mobile menu when clicking close button', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();

    // Close mobile menu
    await page.click('[data-testid="mobile-menu-close"]');

    // Mobile menu should be closed
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
  });

  test('should show sidebar toggle button on hover (desktop)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Sidebar toggle should be hidden initially (opacity-0)
    const toggleButton = page.locator('[data-testid="sidebar-toggle-button"]');
    await expect(toggleButton).toHaveCSS('opacity', '0');

    // Hover over sidebar header (which has the group class)
    await page.hover('[data-testid="sidebar-header"]');

    // Sidebar toggle should be visible on hover (opacity-100)
    await expect(toggleButton).toHaveCSS('opacity', '1');
  });

  test('should handle 404 page gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');

    // Should show 404 page
    await expect(page.locator('text=Page Not Found')).toBeVisible();
    await expect(page.locator('text=Go Home')).toBeVisible();
  });

  test('should show notification icon and wallet button', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Notification icon should be visible
    await expect(page.locator('[data-testid="notification-icon"]')).toBeVisible();

    // Connect wallet button should be visible
    await expect(page.locator('button:has-text("Connect Wallet")')).toBeVisible();
  });

  test('should navigate between pages using sidebar', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Click portfolio link and wait for navigation
    await page.click('[data-testid="nav-link-portfolio"]');
    await page.waitForURL('/portfolio');
    await expect(page).toHaveURL('/portfolio');

    // Click dashboard link and wait for navigation
    await page.click('[data-testid="nav-link-dashboard"]');
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });
});
