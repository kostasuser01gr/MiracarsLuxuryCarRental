# Contributing to Mira Cars

Thank you for considering contributing to Mira Cars! This document outlines the process and guidelines for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 20+ and pnpm 10+
- Git
- Firebase account (for backend features)
- Code editor (VS Code recommended)

### Setup

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/MiracarsLuxuryCarRental.git
   cd MiracarsLuxuryCarRental
   ```

2. **Install Dependencies**:
   ```bash
   corepack enable
   corepack prepare pnpm@10.19.0 --activate
   pnpm install
   ```

3. **Set Up Environment**:
   ```bash
   # Copy sample environment files
   cp .env.sample apps/web/.env.local
   # Fill in your Firebase configuration
   ```

4. **Verify Setup**:
   ```bash
   pnpm build    # Should build all packages
   pnpm test     # Should run tests
   ```

## Development Workflow

### Branch Strategy

- `main` - Production branch (protected)
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `chore/*` - Maintenance tasks

### Creating a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Make your changes** in the appropriate package/app
2. **Write tests** for new functionality
3. **Update documentation** if needed
4. **Commit regularly** with clear messages

### Running Development Server

```bash
# Web app
pnpm dev:web

# Mobile app
pnpm dev:mobile

# Desktop app (requires web server running)
pnpm dev:desktop
```

### Pre-commit Checks

Husky will automatically run on commit:
- Linting (ESLint)
- Formatting (Prettier)
- Type checking (TypeScript)

You can run manually:
```bash
pnpm lint
pnpm typecheck
pnpm format
```

## Pull Request Process

### Before Opening a PR

- [ ] All tests pass locally: `pnpm test`
- [ ] Code is linted and formatted: `pnpm lint && pnpm format`
- [ ] Build succeeds: `pnpm build`
- [ ] E2E tests pass (if applicable): `pnpm test:e2e`
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventions

### Opening a PR

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub:
   - Target: `develop` branch (not `main`)
   - Title: Clear, descriptive summary
   - Description: Explain what, why, and how

3. **PR Template** (use this structure):
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] E2E tests added/updated
   - [ ] Manual testing completed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

### Review Process

1. **Automated Checks**: CI will run tests and builds
2. **Code Review**: At least one approval required
3. **Address Feedback**: Make requested changes
4. **Merge**: Maintainer will merge when approved

## Coding Standards

### TypeScript

- **Strict mode** enabled - no `any` types
- **Explicit return types** for public functions
- **Interface over type** for object shapes
- **Named exports** over default exports

```typescript
// Good
export interface Vehicle {
  id: string;
  name: string;
}

export function calculatePrice(data: PricingData): number {
  // ...
}

// Avoid
export default function(data: any) {
  // ...
}
```

### React Components

- **Functional components** with hooks
- **Props interface** for all components
- **Destructure props** in parameters
- **Early returns** for loading/error states

```typescript
interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (id: string) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  if (!vehicle) return null;
  
  return (
    <div onClick={() => onSelect(vehicle.id)}>
      {/* ... */}
    </div>
  );
}
```

### File Organization

```
feature/
├── components/
│   ├── FeatureComponent.tsx
│   └── FeatureComponent.test.tsx
├── hooks/
│   └── useFeature.ts
├── lib/
│   └── featureUtils.ts
└── types/
    └── feature.ts
```

### Naming Conventions

- **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

### Import Order

1. External imports (react, next, etc.)
2. Internal imports (components, utils)
3. Types/interfaces
4. Styles

```typescript
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { VehicleCard } from '@/components/VehicleCard';
import { calculatePrice } from '@/lib/pricing';

import type { Vehicle } from '@mira-cars/core';

import styles from './Fleet.module.css';
```

## Testing Guidelines

### Unit Tests (Vitest)

- **File location**: `*.test.ts` next to source file
- **Test structure**: Arrange, Act, Assert
- **Coverage**: Aim for 80%+ on new code

```typescript
import { describe, it, expect } from 'vitest';
import { calculatePrice } from './pricing';

describe('calculatePrice', () => {
  it('should calculate price with tax', () => {
    // Arrange
    const data = { dailyRate: 100, days: 3 };
    
    // Act
    const result = calculatePrice(data);
    
    // Assert
    expect(result.total).toBe(372); // 100 * 3 * 1.24
  });
});
```

### E2E Tests (Playwright)

- **File location**: `e2e/*.spec.ts`
- **User-centric**: Test real user flows
- **Accessibility**: Include a11y checks

```typescript
import { test, expect } from '@playwright/test';

test('user can book a vehicle', async ({ page }) => {
  await page.goto('/fleet');
  await page.getByRole('button', { name: /book now/i }).first().click();
  await expect(page).toHaveURL(/\/booking/);
});
```

### Test Best Practices

- Write tests before fixing bugs
- One assertion per test (when possible)
- Use descriptive test names
- Mock external dependencies
- Test edge cases and error scenarios

## Documentation

### Code Comments

- **Why, not what**: Explain reasoning, not obvious code
- **Complex logic**: Add comments for non-trivial algorithms
- **TODOs**: Mark with `// TODO:` and issue number

```typescript
// Calculate price including 24% VAT as required by Greek law
const total = subtotal * 1.24;

// TODO(#123): Add support for different tax rates per country
```

### README Updates

Update relevant READMEs when:
- Adding new packages
- Changing build process
- Adding new scripts
- Modifying architecture

### API Documentation

For new packages, include:
- Overview of purpose
- Installation instructions
- API reference with examples
- Common use cases

## Package-Specific Guidelines

### @mira-cars/core

- Pure functions only (no side effects)
- Comprehensive unit tests required
- Zod schemas for all models
- Zero external dependencies

### @mira-cars/ui

- Storybook examples for components
- Accessibility tests included
- Responsive design
- Dark mode support

### apps/web

- i18n strings for all text
- SEO metadata for pages
- Mobile-first styling
- Performance budgets

### apps/mobile

- Test on both iOS and Android
- Handle offline scenarios
- Minimize bundle size
- Native feel

## Questions?

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Security**: Email security@miracars.gr (don't open public issues)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Thanked in release notes
- Mentioned in announcements

Thank you for contributing to Mira Cars! 🚗✨
