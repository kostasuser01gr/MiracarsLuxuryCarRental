import { test, expect } from '@playwright/test';

test.describe('Fleet Page', () => {
  test('should display vehicle listings', async ({ page }) => {
    await page.goto('/fleet');

    // Check for fleet title
    await expect(page.locator('h1')).toContainText(/fleet|στόλος/i);

    // Check that vehicles are displayed
    await expect(page.getByText('Lamborghini')).toBeVisible();
    await expect(page.getByText('Mercedes-Benz')).toBeVisible();
    await expect(page.getByText('Porsche')).toBeVisible();
  });

  test('should show vehicle details', async ({ page }) => {
    await page.goto('/fleet');

    // Check for vehicle information
    await expect(page.getByText(/seats|θέσεις/i)).toBeVisible();
    await expect(page.getByText(/automatic|manual/i)).toBeVisible();
    await expect(page.getByText(/€/)).toBeVisible();
  });

  test('should display featured badge', async ({ page }) => {
    await page.goto('/fleet');

    // Check for featured badge
    const featured = page.getByText(/featured|προτεινόμενο/i);
    await expect(featured.first()).toBeVisible();
  });

  test('should show availability status', async ({ page }) => {
    await page.goto('/fleet');

    // Check for book now or unavailable buttons
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible();
  });
});

test.describe('Fleet Page - Multi-language', () => {
  test('should display content in Greek', async ({ page }) => {
    await page.goto('/el/fleet');

    await expect(page.locator('h1')).toContainText('Στόλος');
  });

  test('should display content in English', async ({ page }) => {
    await page.goto('/en/fleet');

    await expect(page.locator('h1')).toContainText('Fleet');
  });
});

test.describe('Fleet Page - Responsive', () => {
  test('should display properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fleet');

    // Check that content is still visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Lamborghini')).toBeVisible();
  });

  test('should display properly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/fleet');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Mercedes-Benz')).toBeVisible();
  });
});
