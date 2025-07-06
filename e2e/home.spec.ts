import { test, expect } from '@playwright/test';

test('Home page loads and shows Next.js logo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByAltText('Next.js logo')).toBeVisible();
});

test('Home page shows Deploy now button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Deploy now')).toBeVisible();
});

test('Home page shows Read our docs button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Read our docs')).toBeVisible();
});
