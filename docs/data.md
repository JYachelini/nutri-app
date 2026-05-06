# Data Model

All code keys and field names are in English. Values that are visible UI strings (recipe names, ingredients, steps, days) are in Spanish.

## Constants

- **DAYS:** the 7 days of the week as Spanish strings (Lunes, Martes, ..., Domingo).
- **MEALS:** array of objects with an internal English `key` and a Spanish `label`:
  - `{ key: 'breakfast', label: 'Desayuno' }`
  - `{ key: 'lunch', label: 'Almuerzo' }`
  - `{ key: 'snack', label: 'Merienda' }`
  - `{ key: 'dinner', label: 'Cena' }`
- **TARGETS:** `{ kcal: 2000, protein: 100, carbs: 150, fat: 60 }`

## Recipe shape

Each recipe has the following fields:

- `id` — unique numeric identifier
- `name` — Spanish string (visible in UI)
- `type` — `breakfast` or `lunch`. `breakfast` recipes also serve as snacks; `lunch` recipes also serve as dinners.
- `kcal` — total calories per serving
- `protein` — protein in grams
- `carbs` — carbohydrates in grams
- `fat` — fat in grams
- `tags` — array of Spanish strings (visible in UI): `rápido`, `sin TACC`, `bajo HC`
- `ingredients` — array of objects `{ name, amount }` (Spanish strings)
- `steps` — array of Spanish strings with preparation instructions

## Plan shape

The plan is an object where keys are day names, and each day is an object with meal keys. The value is the assigned recipe `id` or `null`.

```
{
  Lunes: { breakfast: 1, lunch: 8, snack: null, dinner: 19 },
  Martes: { ... },
  ...
}
```

## Recipe catalog

There are 25 initial recipes covering the needs of the plan. They are in the HTML reference file. Approximate distribution:

- 6 breakfast/snack recipes (`type: 'breakfast'`)
- 19 lunch/dinner recipes (`type: 'lunch'`)

Variants include: canned tuna in water, salmon, hake, sardines, eggs, ricotta, port salut cheese, textured soy, lentils, peas, chickpeas, spinach, zucchini, eggplant, potato, sweet potato.

All ingredients are available in Argentine supermarkets.

## Shopping list categories

Category keys are in English, visible labels are in Spanish:

- `protein` (Proteínas): huevo, atún, salmón, merluza, sardinas, ricotta, queso, yogur, soja, tofu, leche, mozzarella
- `carbs` (Hidratos): avena, arroz, fideos, lentejas, arvejas, garbanzos, papa, batata, pan, granola, masa, banana
- `vegetables` (Vegetales): tomate, espinaca, zapallito, zucchini, morrón, berenjena, cebolla, rúcula, ajo
- `fruits` (Frutas): fruta, banana, limón
- `fats` (Lípidos): aceite, canela
- `other` (Otros): anything that does not match the above categories

## Nutritional balance calculation

For each day, sum the macros of all assigned recipes and compare against TARGETS.

Day status rules:

- `empty` — no meals assigned
- `high` — kcal exceeds 115% of target, or protein is below 75% of target
- `low` — kcal below 75% of target, or protein below 60% of target
- `balanced` — everything else

Contextual suggestions are generated based on current percentages (e.g. protein below 75% → suggest adding tuna, salmon, or egg).
