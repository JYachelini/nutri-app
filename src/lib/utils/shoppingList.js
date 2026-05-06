import { SHOPPING_CATEGORIES } from '$lib/data/constants.js';

const CATEGORY_KEYWORDS = {
  protein:    ['huevo', 'atún', 'atun', 'salmón', 'salmon', 'merluza', 'sardina', 'ricotta', 'queso', 'yogur', 'soja', 'tofu', 'leche', 'mozzarella'],
  carbs:      ['avena', 'arroz', 'fideo', 'lentejas', 'arvejas', 'garbanzos', 'papa', 'batata', 'pan', 'granola', 'masa', 'banana'],
  vegetables: ['tomate', 'espinaca', 'zapallito', 'zucchini', 'morrón', 'morron', 'berenjena', 'cebolla', 'rúcula', 'rucula', 'ajo'],
  fruits:     ['fruta', 'banana', 'limón', 'limon'],
  fats:       ['aceite', 'canela'],
};

function categorize(ingredientName) {
  const lower = ingredientName.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) return cat;
  }
  return 'other';
}

export function generateShoppingList(plan, recipes) {
  const ingredientMap = new Map();

  Object.values(plan).forEach(day => {
    Object.values(day).filter(Boolean).forEach(recipeId => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return;
      recipe.ingredients.forEach(({ name, amount }) => {
        const key = name.toLowerCase();
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, { name, amounts: [], category: categorize(name) });
        }
        ingredientMap.get(key).amounts.push(amount);
      });
    });
  });

  const grouped = Object.fromEntries(
    SHOPPING_CATEGORIES.map(cat => [cat.key, { label: cat.label, items: [] }])
  );

  ingredientMap.forEach(({ name, amounts, category }) => {
    grouped[category].items.push({ name, amounts });
  });

  return grouped;
}
