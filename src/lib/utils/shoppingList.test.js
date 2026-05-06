import { describe, it, expect } from 'vitest';
import { generateShoppingList } from './shoppingList.js';

const mockRecipes = [
  {
    id: 1,
    ingredients: [
      { name: 'Avena', amount: '60g' },
      { name: 'Yogur Ser Pro', amount: '1 pote' },
    ],
  },
  {
    id: 2,
    ingredients: [
      { name: 'Avena', amount: '3 cdas' },
      { name: 'Atún al natural', amount: '1 lata' },
    ],
  },
];

const emptyDay = { breakfast: null, lunch: null, snack: null, dinner: null };

describe('generateShoppingList', () => {
  it('returns all categories with empty items when plan is empty', () => {
    const plan = { Lunes: { ...emptyDay } };
    const result = generateShoppingList(plan, mockRecipes);
    expect(result.protein.items).toHaveLength(0);
    expect(result.carbs.items).toHaveLength(0);
    expect(result.other.items).toHaveLength(0);
  });

  it('categorizes avena as carbs', () => {
    const plan = { Lunes: { ...emptyDay, breakfast: 1 } };
    const result = generateShoppingList(plan, mockRecipes);
    expect(result.carbs.items.some(i => i.name === 'Avena')).toBe(true);
  });

  it('categorizes yogur as protein', () => {
    const plan = { Lunes: { ...emptyDay, breakfast: 1 } };
    const result = generateShoppingList(plan, mockRecipes);
    expect(result.protein.items.some(i => i.name === 'Yogur Ser Pro')).toBe(true);
  });

  it('categorizes atún as protein', () => {
    const plan = { Lunes: { ...emptyDay, lunch: 2 } };
    const result = generateShoppingList(plan, mockRecipes);
    expect(result.protein.items.some(i => i.name === 'Atún al natural')).toBe(true);
  });

  it('merges amounts for repeated ingredients across meals', () => {
    const plan = { Lunes: { breakfast: 1, lunch: null, snack: 2, dinner: null } };
    const result = generateShoppingList(plan, mockRecipes);
    const avena = result.carbs.items.find(i => i.name === 'Avena');
    expect(avena).toBeDefined();
    expect(avena.amounts).toEqual(['60g', '3 cdas']);
  });

  it('includes category labels', () => {
    const plan = { Lunes: { ...emptyDay } };
    const result = generateShoppingList(plan, mockRecipes);
    expect(result.protein.label).toBe('Proteínas');
    expect(result.carbs.label).toBe('Hidratos');
  });
});
