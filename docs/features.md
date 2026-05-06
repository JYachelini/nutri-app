# Features

## MVP

Features from the HTML prototype to port to React.

### Weekly planner

- Grid of 7 days × 4 meals (Breakfast, Lunch, Snack, Dinner).
- Each slot shows the assigned recipe name or "+ add" if empty.
- Clicking a slot opens the catalog filtered by type (breakfast or lunch as appropriate).
- Assigned slots have "change" and "remove" buttons.
- Each day header shows the accumulated total kcal and protein.

### Auto-fill week

- Button that fills empty plan slots with random recipes of the correct type.
- Does not replace already assigned recipes.
- Avoids repeating recipes within the same day.

### Nutritional balance

- Always-visible sticky panel while planning.
- For each day, shows progress bars vs targets: kcal, protein, carbohydrates.
- Border color changes based on day status: balanced, high, low, empty.
- Contextual suggestions per day (e.g. "low protein — try adding tuna, salmon or egg").
- Weekly average summary at the bottom of the panel.
- Updates in real time when the plan changes.

### Recipe catalog

- Full list of all recipes with summarized nutritional info.
- Search by name.
- Filter by type (Breakfast/Snack or Lunch/Dinner).
- Sort by protein (asc/desc), kcal (asc/desc), carbs (asc), name (A–Z).
- Clicking a recipe opens a modal with ingredients and preparation steps.

### Recipe modal

- Shows name, meal type, full macros (kcal, protein, carbs, fat).
- Ingredient list with amounts.
- Numbered preparation steps.
- Visible tags if the recipe has them (e.g. "quick", "gluten-free", "low carb").

### Shopping list

- Generated automatically from the assigned weekly plan.
- Groups ingredients by category: Protein, Carbs, Vegetables, Fruit, Fats, Other.
- Shows quantity and, if a recipe is used more than once, the multiplied amount.
- Summary stats at the top: planned meals, average kcal per meal, average protein.

### Persistence

- Weekly plan saved to localStorage.
- Plan is restored on page reload.
- Button to clear the entire plan.

## Future features

Ideas for future iterations. Not part of the MVP.

- Add and edit custom recipes from within the app.
- Mark recipes as favorites.
- History of past weeks with the option to duplicate a previous week.
- Export shopping list to PDF.
- Google Drive integration for plan backup.
- Installable PWA for mobile.
- Receipt photo scanning to populate an ingredient inventory.
- Plan suggestions based on available inventory.
