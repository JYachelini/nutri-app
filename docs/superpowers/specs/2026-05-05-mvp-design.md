# MVP Design — Nutritional Planner

**Date:** 2026-05-05  
**Status:** Approved

## Overview

Port the working HTML prototype (`index.html`) to a SvelteKit app. The prototype already solves all logic and UI — the goal is to give it a proper component structure, localStorage persistence, and a maintainable codebase that can grow with new features.

## Stack

- **SvelteKit + Vite** — meta-framework for Svelte; leaves room for routing, SSR, and PWA later
- **Svelte 5 runes** — `$state`, `$derived`, `$effect` for reactivity and side effects
- **TailwindCSS v4** — utility-first styling
- **localStorage** — client-side persistence only; no backend in MVP

## Architecture

Single-route SPA. Tab navigation (Planificador / Recetas / Lista de compras) is managed with a `$state` variable in `+page.svelte` — not SvelteKit routes. URL stays clean; SvelteKit routing is available for future features.

**State lives in one place:** `src/lib/stores/plan.svelte.js` holds the plan as a `$state` rune and syncs to `localStorage` via `$effect`. Components read the store directly — no prop-drilling for plan state.

**Balance and shopping list** are pure functions in `src/lib/utils/` called inline in their respective components. No derived stores.

## Folder Structure

```
src/
  lib/
    components/
      Planner/          # Week grid, day blocks, meal slots
      BalancePanel/     # Sticky sidebar with progress bars and tips
      Recipes/          # Catalog, filters, search, recipe modal
      ShoppingList/     # Grouped ingredient list
    data/
      recipes.js        # 25 recipes extracted from prototype
      constants.js      # DAYS, MEALS, TARGETS
    stores/
      plan.svelte.js    # $state plan + localStorage sync + mutation fns
    utils/
      balance.js        # Pure fns: daily totals, status, suggestions
      shoppingList.js   # Pure fn: plan → grouped ingredient list
  routes/
    +page.svelte        # Shell: header, nav tabs, active section
  app.html              # Fonts (Cormorant Garamond + Epilogue), grain texture
```

## Components

### `+page.svelte`
Shell only. Holds `activeTab` and `selectedSlot` state. Renders `<Header>`, `<Nav>`, and conditionally the active section. Passes `openRecipes(slot)` to `Planner` so clicking a meal slot can switch tabs with the slot pre-selected.

### `Planner/`
- `Planner.svelte` — two-column layout: week grid left, `BalancePanel` right (sticky)
- `DayBlock.svelte` — day header with total kcal + protein, contains 4 `MealSlot`s
- `MealSlot.svelte` — empty (clickable, shows "+ agregar") or filled (shows name, macros, cambiar/quitar buttons)

### `BalancePanel/`
- `BalancePanel.svelte` — sticky sidebar, iterates all 7 days, weekly summary at bottom
- `DayCard.svelte` — progress bars for kcal/protein/carbs, border color by day status (balanced/high/low/empty), contextual suggestions

### `Recipes/`
- `Recipes.svelte` — search input, type filter, sort dropdown, grid of `RecipeCard`s; selector banner shown when a slot is active
- `RecipeCard.svelte` — compact card with macros; click assigns to slot (if selecting) or opens modal
- `RecipeModal.svelte` — full recipe detail: name, type, macros, ingredients, steps, tags

### `ShoppingList/`
- `ShoppingList.svelte` — summary stats (planned meals, avg kcal, avg protein) + ingredients grouped by category

## Key Interactions

**Slot → recipe selection:**  
Clicking a meal slot stores `{ day, meal }` in `selectedSlot` (in `+page.svelte`), switches to Recipes tab, and shows a selection banner. Clicking a recipe card calls `assignMeal(day, meal, recipeId)` and clears `selectedSlot`.

**Auto-fill:**  
`autofill()` in `plan.svelte.js` iterates all empty slots, filters recipes by correct type, excludes recipes already used that day, picks randomly from the remaining pool.

**Clear plan:**  
`clearPlan()` resets all slots to `null`. Both functions update `$state` which triggers the `$effect` localStorage sync automatically.

**Balance calculation (per day):**  
Sum macros of all assigned recipes → compare against `TARGETS`. Status rules:
- `empty` — no meals assigned
- `high` — kcal > 115% target OR protein < 75% target  
- `low` — kcal < 75% target OR protein < 60% target
- `balanced` — everything else

## Data Model

Plan shape persisted to `localStorage`:
```js
{
  Lunes:   { breakfast: 1, lunch: 8,  snack: null, dinner: 19 },
  Martes:  { breakfast: null, lunch: null, snack: null, dinner: null },
  // ...
}
```

Recipe shape (all code keys English, visible strings Spanish):
```js
{
  id, name, type,        // type: 'breakfast' | 'lunch'
  kcal, protein, carbs, fat,
  tags,                  // Spanish: ['rápido', 'sin TACC', 'bajo HC']
  ingredients,           // [{ name, amount }]
  steps                  // string[]
}
```

## Visual Work

All visual decisions (colors, layout, typography, new components) go through the `ui-ux-pro-max` and `frontend-design` skills. The base palette is defined in `docs/design.md` but can be refined by those skills. Logic-only changes (balance calc, data model, shopping list) do not require the visual skills.

## Out of Scope (MVP)

Custom recipe editor, favorites, week history, PDF export, Google Drive sync, PWA, inventory scanning.
