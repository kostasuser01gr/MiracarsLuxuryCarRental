# E2E Testing with Playwright

This directory contains end-to-end tests for the Mira Cars web application using Playwright.

## Prerequisites

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Run specific test file
npx playwright test e2e/home.spec.ts

# Run tests for a specific project (browser)
npx playwright test --project=chromium
```

## Test Coverage

### Functional Tests

1. **Home Page** (`home.spec.ts`)
   - Page load and rendering
   - Feature cards display
   - Navigation to fleet page
   - Multi-language support (el/en)

2. **Fleet Page** (`fleet.spec.ts`)
   - Vehicle listings display
   - Vehicle details (seats, transmission, price)
   - Featured badge visibility
   - Availability status
   - Multi-language content
   - Responsive design (mobile, tablet, desktop)

### Accessibility Tests

**Coverage** (`accessibility.spec.ts`):
- WCAG 2.0 Level A & AA
- WCAG 2.1 Level A & AA
- WCAG 2.2 Level AA

**Tests Include**:
- Automated accessibility scanning with axe-core
- Color contrast validation
- Keyboard navigation support
- ARIA attributes validation
- Semantic HTML structure
- Image alt text presence

## Test Structure

```
e2e/
├── home.spec.ts           # Home page tests
├── fleet.spec.ts          # Fleet page tests
├── accessibility.spec.ts  # Accessibility tests
└── README.md              # This file
```

## Writing Tests

### Example Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path');
    
    await expect(page.locator('h1')).toContainText('Expected Text');
  });
});
```

### Accessibility Test Example

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility issues', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## Test Configuration

Configuration is in `playwright.config.ts` at the repository root:

- **Base URL**: `http://localhost:3000` (configurable via `BASE_URL` env var)
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Retries**: 2 on CI, 0 locally
- **Reporter**: GitHub Actions on CI, HTML locally
- **Dev Server**: Automatically starts `pnpm dev:web` before tests

## CI Integration

Tests run automatically in GitHub Actions on:
- Pull requests
- Pushes to main/develop branches

See `.github/workflows/ci.yml` for the full configuration.

## Debugging

### Debug Mode

```bash
# Open Playwright Inspector
npx playwright test --debug

# Debug specific test
npx playwright test e2e/home.spec.ts --debug
```

### View Test Report

```bash
# View HTML report
pnpm test:report
```

### Screenshots and Traces

- Screenshots are captured on failure
- Traces are recorded on first retry
- Both are available in the test report

## Best Practices

1. **Use User-Facing Queries**
   - Prefer `getByRole`, `getByText`, `getByLabel` over CSS selectors
   - Makes tests more resilient and accessible

2. **Wait for Elements**
   - Use auto-waiting: `await expect(locator).toBeVisible()`
   - Avoid `page.waitForTimeout()` when possible

3. **Test Real User Flows**
   - Focus on critical user journeys
   - Test happy paths and error cases

4. **Keep Tests Independent**
   - Each test should be able to run in isolation
   - Don't rely on previous test state

5. **Accessibility First**
   - Include accessibility checks in all tests
   - Test keyboard navigation
   - Verify ARIA attributes

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
