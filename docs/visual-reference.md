# Visual Reference

The file `index.html` in the project root is the fully functional prototype.

## How to use it

- Open it in a browser to see the real behavior.
- It is a single file with embedded HTML, CSS and JS.
- The entire MVP is already implemented and working there.

## What to take from it

- **UI/UX:** layout, spacing, typography, animations, hover behavior and transitions.
- **Logic:** implementation of auto-fill, shopping list generation, balance calculation, recipe modal handling.
- **Data:** the 25 recipes with their ingredients and steps are in the `recipes` array inside the `<script>` tag.

## What to change when porting to React

- Convert manual DOM manipulation into components with state.
- Use the `usePlan` hook for plan state instead of a global variable.
- Sync with localStorage automatically via `useEffect`.
- Replace inline CSS classes with Tailwind classes or CSS modules as appropriate.
- Move recipe data into a separate module (`src/data/recipes.js`).

## Prototype limitations

- Plan does not persist on page reload (solved with localStorage in the React version).
- Everything in a single file — no component structure.
- No types or data validation.
