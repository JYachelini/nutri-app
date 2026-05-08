# Technical Stack

## Technologies

- **SvelteKit** with Vite as bundler
- **Svelte 5** with runes (`$state`, `$derived`, `$derived.by()`, `$effect`)
- **TailwindCSS v4** for styling — color tokens defined via `@theme` in CSS (see `docs/design.md`)
- **localStorage** to persist the weekly plan between sessions
- **Vitest** with jsdom for unit testing

## Initialization

The project was created with `npm create svelte@latest` using the SvelteKit skeleton template. TailwindCSS v4 is installed and configured with `@tailwindcss/vite`.

## Architecture decisions

- Plan state lives in `src/lib/stores/plan.svelte.js` using Svelte 5 `$state`. It syncs to localStorage on every mutation.
- Recipes are static data in `src/lib/data/` — no API required.
- No backend in the MVP. Everything runs client-side.
- Navigation between sections uses tabs with local `$state` (no SvelteKit routing).

## Svelte 5 gotchas

- `$derived(() => {...})` returns the function, not the result — use `$derived.by(() => {...})` for computed values with logic.
- Event modifiers like `onclick|stopPropagation` are not valid in Svelte 5 — use `onclick={e => { e.stopPropagation(); fn(); }}`.
- SVG data URIs with quotes inside inline styles break the Svelte parser — move to a CSS class instead.

## Possible future extensions

- Google Drive sync (via API, requires OAuth)
- Custom backend for multi-user support or cross-device sync
- PWA for mobile installation

## n8n automation

A local n8n instance (Docker) handles automation workflows. See `docs/n8n/` for available workflows.
