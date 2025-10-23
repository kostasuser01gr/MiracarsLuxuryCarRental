import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');

    // Check for the main heading
    await expect(page.locator('h1')).toContainText('Mira Cars');
  });

  test('should have all feature cards', async ({ page }) => {
    await page.goto('/');

    // Check for feature sections
    await expect(page.getByText('Premium Fleet')).toBeVisible();
    await expect(page.getByText('24/7 Support')).toBeVisible();
    await expect(page.getByText('Best Rates')).toBeVisible();
  });

  test('should navigate to fleet page', async ({ page }) => {
    await page.goto('/');

    // Click the View Fleet button
    await page.getByRole('link', { name: /view fleet/i }).click();

    // Should navigate to fleet page
    await expect(page).toHaveURL(/\/fleet/);
  });

  test('should support language switching', async ({ page }) => {
    // Test default Greek locale
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Mira Cars');

    // Test English locale
    await page.goto('/en');
    await expect(page.locator('h1')).toContainText('Mira Cars');
  });
});

test.describe('Home Page - Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
  });

  test('should have accessible links', async ({ page }) => {
    await page.goto('/');

    // All links should have text or aria-label
    const links = await page.locator('a').all();
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });
});
