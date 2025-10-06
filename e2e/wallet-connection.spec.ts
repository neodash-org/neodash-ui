import { test, expect } from '@playwright/test';

test.describe('Wallet Connection Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display connect wallet button in header', async ({ page }) => {
    // Check that connect wallet button is visible on desktop
    await expect(page.getByTestId('connect-wallet-button')).toBeVisible();
    await expect(page.getByTestId('connect-wallet-button')).toHaveText('Connect Wallet');
  });

  test('should open wallet connection modal when button is clicked', async ({ page }) => {
    // Click connect wallet button
    await page.getByTestId('connect-wallet-button').click();

    // Check that modal opens
    await expect(page.getByTestId('wallet-connection-modal')).toBeVisible();
    await expect(page.getByText('Connect Wallet')).toBeVisible();
  });

  test('should display ecosystem selector in modal', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Check ecosystem selector is visible
    await expect(page.getByTestId('ecosystem-selector')).toBeVisible();
    await expect(page.getByText('Choose Your Ecosystem')).toBeVisible();
  });

  test('should display both EVM and Solana ecosystem cards', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Check both ecosystem cards are visible
    await expect(page.getByTestId('evm-ecosystem-card')).toBeVisible();
    await expect(page.getByTestId('solana-ecosystem-card')).toBeVisible();

    // Check ecosystem names using role to avoid duplicate text matches
    await expect(page.getByRole('heading', { name: 'Ethereum', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Solana', exact: true })).toBeVisible();
  });

  test('should display ecosystem descriptions', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Check descriptions
    await expect(page.getByText('Connect to Ethereum and EVM-compatible chains')).toBeVisible();
    await expect(page.getByText('Connect to Solana blockchain')).toBeVisible();
  });

  test('should show Solana wallet selector when Solana card is clicked', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Click Solana ecosystem card
    await page.getByTestId('solana-ecosystem-card').click();

    // Check that Solana wallet selector is shown
    await expect(page.getByText('Connect to Solana')).toBeVisible();
    await expect(page.getByText('Select a wallet to connect to Solana')).toBeVisible();
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();
    await expect(page.getByTestId('wallet-connection-modal')).toBeVisible();

    // Click close button (X in top right)
    await page.getByRole('button', { name: 'Close' }).click();

    // Check that modal is closed
    await expect(page.getByTestId('wallet-connection-modal')).not.toBeVisible();
  });

  test('should close modal when clicking outside', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();
    await expect(page.getByTestId('wallet-connection-modal')).toBeVisible();

    // Click outside modal (on backdrop)
    await page.click('body', { position: { x: 10, y: 10 } });

    // Check that modal is closed
    await expect(page.getByTestId('wallet-connection-modal')).not.toBeVisible();
  });

  test('should handle back navigation in Solana selector', async ({ page }) => {
    // Open modal and go to Solana selector
    await page.getByTestId('connect-wallet-button').click();
    await page.getByTestId('solana-ecosystem-card').click();

    // Click back button
    await page.getByRole('button', { name: 'Back' }).click();

    // Check that we're back to ecosystem selector
    await expect(page.getByTestId('ecosystem-selector')).toBeVisible();
    await expect(page.getByText('Choose Your Ecosystem')).toBeVisible();
  });
});

test.describe('Wallet Connection - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
  });

  test('should display connect wallet button in mobile header', async ({ page }) => {
    // Check that connect wallet button is visible on mobile
    await expect(page.getByTestId('connect-wallet-button')).toBeVisible();
  });

  test('should open modal on mobile when button is clicked', async ({ page }) => {
    // Click connect wallet button
    await page.getByTestId('connect-wallet-button').click();

    // Check that modal opens
    await expect(page.getByTestId('wallet-connection-modal')).toBeVisible();
  });

  test('should display ecosystem cards in mobile modal', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Check ecosystem cards are visible on mobile
    await expect(page.getByTestId('evm-ecosystem-card')).toBeVisible();
    await expect(page.getByTestId('solana-ecosystem-card')).toBeVisible();
  });
});

test.describe('Wallet Connection - Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Toggle to dark mode
    await page.getByTestId('theme-toggle').click();
  });

  test('should display modal correctly in dark mode', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Check that modal is visible in dark mode
    await expect(page.getByTestId('wallet-connection-modal')).toBeVisible();
    await expect(page.getByTestId('ecosystem-selector')).toBeVisible();
  });

  test('should display ecosystem cards correctly in dark mode', async ({ page }) => {
    // Open modal
    await page.getByTestId('connect-wallet-button').click();

    // Check ecosystem cards are visible in dark mode
    await expect(page.getByTestId('evm-ecosystem-card')).toBeVisible();
    await expect(page.getByTestId('solana-ecosystem-card')).toBeVisible();
  });
});
