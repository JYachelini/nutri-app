# Project Structure

```
src/
  components/
    Planner/              # Main weekly planner view
    BalancePanel/         # Sticky panel with nutritional balance bars
    Recipes/              # Catalog, filters, search and recipe detail modal
    ShoppingList/         # Shopping list view generated from the plan
  data/
    recipes.js            # Recipe catalog (see docs/data.md)
    constants.js          # DAYS, MEALS, TARGETS
  hooks/
    usePlan.js            # Plan state + localStorage persistence
    useBalance.js         # Derived calculations from plan (daily and weekly totals)
  utils/
    shoppingList.js       # Logic to generate grouped list from the plan
  App.jsx
  main.jsx
```

## Conventions

- All code nomenclature (folders, files, variables, functions, components, props, object keys) is in English. Only visible UI text strings are in Spanish.
- Each component lives in its own folder when it has more than one associated file (styles, sub-components, helpers).
- Hooks start with `use`.
- Static data goes in `src/data/`.
- Reusable logic that is not a hook goes in `src/utils/`.

## Main components

- **Planner** — orchestrates the weekly plan view. Two-column layout: grid on the left, balance panel on the right.
- **BalancePanel** — always visible while planning. Shows daily balance and weekly summary.
- **Recipes** — catalog with filters and search. Clicking a recipe opens a detail modal.
- **ShoppingList** — derived view from the plan, groups ingredients by category.

## Constants

Constants in `src/data/constants.js`:

- `DAYS` — the 7 days of the week
- `MEALS` — the 4 meal slots (internal keys in English: `breakfast`, `lunch`, `snack`, `dinner`; labels shown in UI are in Spanish)
- `TARGETS` — nutritional goals with keys `kcal`, `protein`, `carbs`, `fat`
