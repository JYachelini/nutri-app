# Project Structure

```
src/
  lib/
    components/
      Planner/              # Main weekly planner view
        Planner.svelte
        DayBlock.svelte
        MealSlot.svelte
      BalancePanel/         # Sticky panel with nutritional balance bars
        BalancePanel.svelte
        DayCard.svelte
      Recipes/              # Catalog, filters, search and recipe detail modal
        Recipes.svelte
      ShoppingList/         # Shopping list view generated from the plan
        ShoppingList.svelte
    data/
      recipes.js            # Recipe catalog (see docs/data.md)
      constants.js          # DAYS, MEALS, TARGETS
    stores/
      plan.svelte.js        # Plan state ($state) + localStorage persistence
    utils/
      balance.js            # getDayTotals, getDayStatus, getDaySuggestions, getWeeklyAverage
      shoppingList.js       # generateShoppingList — grouped list from plan
  routes/
    +page.svelte            # App shell: header, nav tabs, view switching
    +layout.svelte
    layout.css              # Global styles including .grain overlay
n8n/
  docker-compose.yml        # n8n local instance (port 5678)
  .env                      # API keys — not in git
  data/                     # n8n DB and credentials — not in git
docs/
  n8n/
    tiktok-recipe-bot.json  # Importable n8n workflow
```

## Conventions

- All code nomenclature (folders, files, variables, functions, components, props, object keys) is in English. Only visible UI text strings are in Spanish.
- Each component lives in its own folder when it has more than one associated file.
- Stores use the `.svelte.js` extension to enable Svelte runes.
- Static data goes in `src/lib/data/`.
- Reusable logic that is not a store goes in `src/lib/utils/`.

## Main components

- **Planner** — orchestrates the weekly plan view. Two-column layout: grid on the left, balance panel on the right.
- **BalancePanel** — always visible while planning. Shows daily balance and weekly summary.
- **Recipes** — catalog with filters and search. Clicking a recipe opens a detail modal.
- **ShoppingList** — derived view from the plan, groups ingredients by category.

## Constants

Constants in `src/lib/data/constants.js`:

- `DAYS` — the 7 days of the week
- `MEALS` — the 4 meal slots (internal keys in English: `breakfast`, `lunch`, `snack`, `dinner`; labels shown in UI are in Spanish)
- `TARGETS` — nutritional goals with keys `kcal`, `protein`, `carbs`, `fat`
