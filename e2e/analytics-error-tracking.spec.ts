import { test, expect } from '@playwright/test';

test.describe('Analytics and Error Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Helper function to mock PostHog
  const mockPostHog = async (page: { addInitScript: (script: () => void) => Promise<void> }) => {
    await page.addInitScript(() => {
      window.posthog = {
        capture: () => {},
        identify: () => {},
        getFeatureFlag: () => false,
        isFeatureEnabled: () => false,
        _captured: [],
      };
      // Override capture to store calls
      window.posthog.capture = (...args: unknown[]) => {
        window.posthog._captured.push(args);
      };
    });
  };

  test('should track theme toggle events', async ({ page }) => {
    await mockPostHog(page);

    // Click theme toggle
    await page.click('[data-testid="theme-toggle"]');

    // Verify PostHog event was captured
    const posthogCapture = await page.evaluate(() => {
      return window.posthog._captured;
    });

    expect(posthogCapture).toHaveLength(1);
    expect((posthogCapture as unknown[][])[0][0]).toBe('theme_changed');
  });

  test('should track navigation events', async ({ page }) => {
    await mockPostHog(page);

    // Navigate to portfolio
    await page.click('[data-testid="nav-link-portfolio"]');

    // Verify PostHog event was captured
    const posthogCapture = await page.evaluate(() => {
      return window.posthog._captured;
    });

    expect(posthogCapture).toHaveLength(1);
    expect((posthogCapture as unknown[][])[0][0]).toBe('navigation');
  });

  test('should track mobile menu interactions', async ({ page }) => {
    await mockPostHog(page);

    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');

    // Verify PostHog event was captured
    const posthogCapture = await page.evaluate(() => {
      return window.posthog._captured;
    });

    expect(posthogCapture).toHaveLength(1);
    expect((posthogCapture as unknown[][])[0][0]).toBe('feature_used');
    expect(((posthogCapture as unknown[][])[0][1] as Record<string, unknown>).feature_name).toBe(
      'mobile_menu',
    );
  });

  test('should track header interactions', async ({ page }) => {
    await mockPostHog(page);

    // Click notification bell
    await page.click('[data-testid="notification-icon"]');

    // Verify PostHog event was captured
    const posthogCapture = await page.evaluate(() => {
      return window.posthog._captured;
    });

    expect(posthogCapture).toHaveLength(1);
    expect((posthogCapture as unknown[][])[0][0]).toBe('feature_used');
    expect(((posthogCapture as unknown[][])[0][1] as Record<string, unknown>).feature_name).toBe(
      'notifications',
    );
  });

  test('should handle errors gracefully with Error Boundary', async ({ page }) => {
    // Mock Sentry captureException
    await page.addInitScript(() => {
      window.Sentry = {
        captureException: () => {},
        captureMessage: () => {},
        setUser: () => {},
        addBreadcrumb: () => {},
        _capturedMessages: [],
      };
      window.Sentry.captureMessage = (...args: unknown[]) => {
        window.Sentry._capturedMessages!.push(args);
      };
    });

    // Trigger an error by navigating to a non-existent route
    await page.goto('/non-existent-page');

    // Verify 404 page is shown
    await expect(page.locator('text=Page Not Found')).toBeVisible();

    // Verify Sentry message was captured
    const sentryCapture = await page.evaluate(() => {
      return window.Sentry._capturedMessages;
    });

    expect(sentryCapture).toHaveLength(1);
    expect((sentryCapture as unknown[][])[0][0]).toBe('Page not found (404)');
  });

  test('should track wallet connection attempts', async ({ page }) => {
    await mockPostHog(page);

    // Click connect wallet button
    await page.click('button:has-text("Connect Wallet")');

    // Verify PostHog event was captured
    const posthogCapture = await page.evaluate(() => {
      return window.posthog._captured;
    });

    expect(posthogCapture).toHaveLength(1);
    expect((posthogCapture as unknown[][])[0][0]).toBe('feature_used');
    expect(((posthogCapture as unknown[][])[0][1] as Record<string, unknown>).feature_name).toBe(
      'wallet_connection',
    );
  });

  test('should handle JavaScript errors with Sentry', async ({ page }) => {
    // Mock Sentry captureException
    await page.addInitScript(() => {
      window.Sentry = {
        captureException: () => {},
        captureMessage: () => {},
        setUser: () => {},
        addBreadcrumb: () => {},
        _capturedExceptions: [],
      };
      window.Sentry.captureException = (...args: unknown[]) => {
        window.Sentry._capturedExceptions!.push(args);
      };
    });

    // Trigger a JavaScript error
    await page.evaluate(() => {
      throw new Error('Test error for Sentry');
    });

    // Verify Sentry captured the error
    const sentryCapture = await page.evaluate(() => {
      return window.Sentry._capturedExceptions;
    });

    expect((sentryCapture as unknown[]).length).toBeGreaterThan(0);
  });

  test('should track sidebar toggle on hover (desktop)', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1024, height: 768 });

    await mockPostHog(page);

    // Hover over sidebar to show toggle button
    await page.hover('[data-testid="desktop-sidebar"]');

    // Click the toggle button
    await page.click('[data-testid="sidebar-toggle-button"]');

    // Verify sidebar collapsed
    await expect(
      page.locator('[data-testid="desktop-sidebar"][data-collapsed="true"]'),
    ).toBeVisible();
  });
});
