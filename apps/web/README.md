# Mira Cars Web App

Next.js 14 web application for the Mira Cars luxury car rental platform.

## Features

- **Next.js 14** with App Router
- **React 18** for UI
- **TypeScript** strict mode
- **Tailwind CSS 4** for styling
- **Monorepo Integration**: Uses shared packages (@mira-cars/core, @mira-cars/ui, @mira-cars/sdk)

## Development

```bash
# From root of monorepo
pnpm dev:web

# Or from this directory
pnpm dev
```

The app will be available at http://localhost:3000

## Building

```bash
# From root of monorepo
pnpm build:web

# Or from this directory
pnpm build
```

## Pages

- `/` - Home page with platform overview
- `/fleet` - Vehicle listing (uses @mira-cars/core Vehicle type)
- More pages to be added...

## Environment Variables

Copy `.env.sample` from the root and create `.env.local` in this directory with your Firebase configuration.

## Project Structure

```
apps/web/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Home page
│       ├── globals.css      # Global styles
│       └── fleet/
│           └── page.tsx     # Fleet listing
├── public/                  # Static assets
├── next.config.mjs          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```
