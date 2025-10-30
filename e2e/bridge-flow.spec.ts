import { test, expect } from '@playwright/test';

// Skipped until the Bridge page is implemented (Agent 3).
test.skip('Bridge flow: select → quote renders → Execute disabled when not connected', async ({
  page,
}) => {
  await page.goto('/bridge');

  // Basic smoke: page loads without crashing
  await expect(page).toHaveTitle(/NeoDash/i);

  // Placeholders for future interactions once components exist
  // await page.getByTestId('from-chain-select').click();
  // await page.getByRole('option', { name: /Ethereum/i }).click();
  // await page.getByTestId('from-token-select').click();
  // await page.getByRole('option', { name: /ETH/i }).click();
  // await page.getByTestId('to-chain-select').click();
  // await page.getByRole('option', { name: /Polygon/i }).click();
  // await page.getByTestId('amount-input').fill('1');

  // Quote summary should render values once selections are made
  // await expect(page.getByTestId('quote-summary')).toBeVisible();

  // Execute should be disabled when wallet not connected
  // await expect(page.getByTestId('execute-button')).toBeDisabled();
});
