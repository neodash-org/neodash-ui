import { test, expect } from '@playwright/test';

test.describe('Navigation - Desktop', () => {
  test('should show desktop sidebar by default', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Desktop sidebar should be visible
    await expect(page.getByTestId('desktop-sidebar')).toBeVisible();

    // Mobile menu button should be hidden
    await expect(page.getByTestId('mobile-menu-button')).not.toBeVisible();

    // Page title should be in header
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should toggle sidebar collapse on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Sidebar should be expanded initially
    await expect(page.getByTestId('desktop-sidebar')).toHaveClass(/w-64/);

    // Click toggle button
    await page.getByTestId('sidebar-toggle-button').click();

    // Sidebar should be collapsed
    await expect(page.getByTestId('desktop-sidebar')).toHaveClass(/w-16/);

    // Click again to expand
    await page.getByTestId('sidebar-toggle-button').click();

    // Sidebar should be expanded again
    await expect(page.getByTestId('desktop-sidebar')).toHaveClass(/w-64/);
  });

  test('should navigate between routes on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Navigate to Portfolio
    await page.getByRole('link', { name: /portfolio/i }).click();
    await expect(page).toHaveURL('/portfolio');
    await expect(page.getByRole('heading', { name: 'Portfolio' })).toBeVisible();

    // Navigate to Analytics
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL('/analytics');
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();

    // Navigate back to Dashboard
    await page.getByRole('link', { name: /dashboard/i }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show active navigation state on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/portfolio');

    // Portfolio link should be active
    const portfolioLink = page.getByRole('link', { name: /portfolio/i });
    await expect(portfolioLink).toHaveClass(/text-neon-cyan/);

    // Dashboard link should not be active
    const dashboardLink = page.getByRole('link', { name: /dashboard/i });
    await expect(dashboardLink).not.toHaveClass(/text-neon-cyan/);
  });

  test('should have theme toggle in header on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Theme toggle should be in header
    await expect(page.getByTestId('theme-toggle')).toBeVisible();

    // Should toggle between light and dark themes
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains('dark'),
    );

    await page.getByTestId('theme-toggle').click();

    const newTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(newTheme).toBe(!initialTheme);
  });
});

test.describe('Navigation - Mobile', () => {
  test('should show mobile menu button and hide desktop sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Mobile menu button should be visible
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    // Desktop sidebar should be hidden
    await expect(page.getByTestId('desktop-sidebar')).not.toBeVisible();

    // Page title should be below header
    await expect(page.getByTestId('page-title')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
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

  test('should close mobile menu when clicking overlay', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Open mobile menu
    await page.getByTestId('mobile-menu-button').click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Click overlay to close
    await page.getByTestId('mobile-menu-overlay').click();
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });

  test('should navigate between routes on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Open mobile menu
    await page.getByTestId('mobile-menu-button').click();

    // Navigate to Portfolio
    await page.getByRole('link', { name: /portfolio/i }).click();
    await expect(page).toHaveURL('/portfolio');
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible(); // Menu should close
    await expect(page.getByRole('heading', { name: 'Portfolio' })).toBeVisible();

    // Open menu again and navigate to Analytics
    await page.getByTestId('mobile-menu-button').click();
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL('/analytics');
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();
  });

  test('should have theme toggle in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Open mobile menu
    await page.getByTestId('mobile-menu-button').click();

    // Theme toggle should be in mobile menu
    await expect(page.getByTestId('mobile-menu-theme-toggle')).toBeVisible();

    // Should toggle between light and dark themes
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains('dark'),
    );

    await page.getByTestId('mobile-menu-theme-toggle').click();

    const newTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(newTheme).toBe(!initialTheme);
  });

  test('should show active navigation state on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/portfolio');

    // Open mobile menu
    await page.getByTestId('mobile-menu-button').click();

    // Portfolio link should be active
    const portfolioLink = page.getByRole('link', { name: /portfolio/i });
    await expect(portfolioLink).toHaveClass(/text-neon-cyan/);

    // Dashboard link should not be active
    const dashboardLink = page.getByRole('link', { name: /dashboard/i });
    await expect(dashboardLink).not.toHaveClass(/text-neon-cyan/);
  });
});

test.describe('Navigation - Responsive Behavior', () => {
  test('should switch from mobile to desktop layout on resize', async ({ page }) => {
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

  test('should close mobile menu when switching to desktop', async ({ page }) => {
    // Start with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Open mobile menu
    await page.getByTestId('mobile-menu-button').click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Resize to desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    // Mobile menu should be closed
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });

  test('should maintain navigation state across viewport changes', async ({ page }) => {
    // Start with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/portfolio');

    // Should be on portfolio page
    await expect(page).toHaveURL('/portfolio');
    await expect(page.getByRole('heading', { name: 'Portfolio' })).toBeVisible();

    // Resize to desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    // Should still be on portfolio page
    await expect(page).toHaveURL('/portfolio');
    await expect(page.getByRole('heading', { name: 'Portfolio' })).toBeVisible();

    // Portfolio link should be active in desktop sidebar
    const portfolioLink = page.getByRole('link', { name: /portfolio/i });
    await expect(portfolioLink).toHaveClass(/text-neon-cyan/);
  });
});

test.describe('Header Components', () => {
  test('should show all header elements on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');

    // Logo should be visible
    await expect(page.getByAltText('NeoDash')).toBeVisible();

    // Theme toggle should be visible
    await expect(page.getByTestId('theme-toggle')).toBeVisible();

    // Notification icon should be visible
    await expect(page.getByTestId('notification-icon')).toBeVisible();

    // Connect wallet button should be visible
    await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
  });

  test('should show appropriate header elements on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Logo should be visible
    await expect(page.getByAltText('NeoDash')).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    // Theme toggle should be in mobile menu, not header
    await expect(page.getByTestId('theme-toggle')).not.toBeVisible();

    // Notification icon should be visible
    await expect(page.getByTestId('notification-icon')).toBeVisible();

    // Connect wallet button should be visible
    await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
  });
});
