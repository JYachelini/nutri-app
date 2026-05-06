import { describe, it, expect, beforeEach, vi } from 'vitest';

const store = {};
vi.stubGlobal('localStorage', {
  getItem: vi.fn(key => store[key] ?? null),
  setItem: vi.fn((key, val) => { store[key] = val; }),
});

const { plan, assignMeal, removeMeal, clearPlan } = await import('./plan.svelte.js');

describe('plan store', () => {
  beforeEach(() => {
    clearPlan();
  });

  it('starts with all slots null', () => {
    expect(plan['Lunes']['breakfast']).toBeNull();
    expect(plan['Domingo']['dinner']).toBeNull();
  });

  it('assignMeal sets the recipe id', () => {
    assignMeal('Lunes', 'breakfast', 5);
    expect(plan['Lunes']['breakfast']).toBe(5);
  });

  it('removeMeal sets the slot back to null', () => {
    assignMeal('Lunes', 'breakfast', 5);
    removeMeal('Lunes', 'breakfast');
    expect(plan['Lunes']['breakfast']).toBeNull();
  });

  it('clearPlan resets all slots to null', () => {
    assignMeal('Lunes', 'breakfast', 1);
    assignMeal('Martes', 'lunch', 8);
    clearPlan();
    expect(plan['Lunes']['breakfast']).toBeNull();
    expect(plan['Martes']['lunch']).toBeNull();
  });

  it('saves to localStorage on mutation', () => {
    assignMeal('Lunes', 'breakfast', 3);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
