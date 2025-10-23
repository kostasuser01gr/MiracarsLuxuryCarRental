# Mira Cars Desktop App

Desktop application wrapper built with Tauri, loading the web application.

## Overview

This Tauri application wraps the Next.js web app and provides:
- Native desktop experience (Windows, macOS, Linux)
- System tray integration
- Auto-update capabilities (scaffolded)
- Native file system access
- Enhanced performance

## Architecture

The desktop app loads the web application in two modes:
- **Development**: Connects to `http://localhost:3000` (Next.js dev server)
- **Production**: Bundles the built Next.js app from `apps/web/.next`

## Prerequisites

- Rust (latest stable)
- Node.js 20+
- pnpm 10+

### Platform-specific requirements

**macOS**:
- Xcode Command Line Tools

**Windows**:
- Microsoft Visual Studio C++ Build Tools

**Linux**:
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

## Getting Started

### Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Development

```bash
# Start Next.js dev server (from repo root)
pnpm dev:web

# In another terminal, start Tauri
pnpm dev:desktop
```

This will:
1. Build the Rust application
2. Open a native window
3. Load `http://localhost:3000` (your Next.js dev server)

### Building for Production

```bash
# Build the web app first
pnpm build:web

# Build the desktop app
pnpm --filter=desktop build
```

The built application will be in:
- **macOS**: `apps/desktop/src-tauri/target/release/bundle/dmg/`
- **Windows**: `apps/desktop/src-tauri/target/release/bundle/msi/`
- **Linux**: `apps/desktop/src-tauri/target/release/bundle/deb/` or `appimage/`

## Configuration

Edit `src-tauri/tauri.conf.json` to customize:
- Window size and properties
- Application metadata
- Build settings
- Allowed APIs
- System tray options

## Icons

Generate icons from a 1024x1024 PNG:

```bash
cd apps/desktop
pnpm tauri icon path/to/icon.png
```

This will generate all required icon sizes and formats.

## Features

### Current
- [x] Window management (close, minimize, maximize)
- [x] System tray (placeholder)
- [x] Loads web application
- [x] Development and production modes

### Planned
- [ ] Auto-update mechanism
- [ ] Native notifications
- [ ] Deep linking
- [ ] Custom menus
- [ ] Keyboard shortcuts
- [ ] Offline support

## Security

Tauri provides a secure-by-default approach:
- Minimal API surface by default
- Content Security Policy
- IPC (Inter-Process Communication) validation

Current allowlist in `tauri.conf.json`:
- `shell.open`: Open URLs in default browser
- `window.*`: Window management operations

## Troubleshooting

### Build fails on first run

Run `cargo check` in `src-tauri` directory to download dependencies:

```bash
cd apps/desktop/src-tauri
cargo check
```

### Window doesn't open

Make sure the web dev server is running:

```bash
pnpm dev:web
```

### Icons not found

Generate icons or add placeholder images:

```bash
pnpm tauri icon <source-icon.png>
```

## Production Deployment

### Code Signing

**macOS**: Configure in `tauri.conf.json` under `bundle.macOS.signingIdentity`

**Windows**: Configure in `tauri.conf.json` under `bundle.windows.certificateThumbprint`

### Distribution

- **macOS**: DMG or PKG
- **Windows**: MSI or NSIS installer
- **Linux**: AppImage, deb, or rpm

## CI/CD Integration

Add to GitHub Actions workflow:

```yaml
- name: Install Rust
  uses: actions-rs/toolchain@v1
  with:
    toolchain: stable

- name: Build Tauri App
  run: pnpm --filter=desktop build
```

See `.github/workflows/ci.yml` for the full configuration.

## Resources

- [Tauri Documentation](https://tauri.app/)
- [Tauri API](https://tauri.app/v1/api/js/)
- [Tauri Guides](https://tauri.app/v1/guides/)
