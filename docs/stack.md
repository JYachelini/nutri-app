# Technical Stack

## Technologies

- **React** with Vite as bundler
- **TailwindCSS** for styling (color tokens are defined in `docs/design.md`)
- **localStorage** to persist the weekly plan between sessions
- **React Router** optional — if navigation between sections is simple, tabs with local state are enough

## Initialization

The project is created with `npm create vite@latest` React template. TailwindCSS is installed and configured separately.

## Architecture decisions

- Plan state lives in a dedicated hook (`usePlan`) that automatically syncs with localStorage.
- Recipes are static data in a module — no API required.
- No backend in the MVP. Everything runs client-side.

## Possible future extensions

- Google Drive sync (via API, requires OAuth)
- Custom backend for multi-user support or cross-device sync
- PWA for mobile installation
