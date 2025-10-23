# @mira-cars/ui

Shared UI component library for web applications.

## Features

- **Utilities**: `cn()` function for className merging
- **Ready for**: shadcn/ui components
- **TypeScript**: Full type safety
- **Tailwind CSS**: Built-in support

## Usage

```typescript
import { cn } from '@mira-cars/ui';

// Merge classNames
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

## Development

```bash
pnpm dev     # Watch mode
pnpm build   # Production build
```

## Roadmap

- [ ] Button component
- [ ] Input component
- [ ] Card component
- [ ] Modal component
- [ ] More shadcn/ui components...
