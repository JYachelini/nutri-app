import { DAYS, MEALS } from '$lib/data/constants.js';
import { recipes } from '$lib/data/recipes.svelte.js';

const STORAGE_KEY = 'nutri-plan';

function createEmptyPlan() {
  return Object.fromEntries(
    DAYS.map(day => [day, Object.fromEntries(MEALS.map(m => [m.key, null]))])
  );
}

function loadFromStorage() {
  if (typeof localStorage === 'undefined') return createEmptyPlan();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : createEmptyPlan();
  } catch {
    return createEmptyPlan();
  }
}

export const plan = $state(loadFromStorage());

function save() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }
}

export function assignMeal(day, meal, recipeId) {
  plan[day][meal] = recipeId;
  save();
}

export function removeMeal(day, meal) {
  plan[day][meal] = null;
  save();
}

export function clearPlan() {
  DAYS.forEach(day => MEALS.forEach(m => { plan[day][m.key] = null; }));
  save();
}

export function autofill() {
  DAYS.forEach(day => {
    MEALS.forEach(({ key }) => {
      if (plan[day][key] !== null) return;
      const type = (key === 'breakfast' || key === 'snack') ? 'breakfast' : 'lunch';
      const pool = recipes.filter(r => r.type === type);
      const usedIds = Object.values(plan[day]).filter(Boolean);
      const available = pool.filter(r => !usedIds.includes(r.id));
      const source = available.length ? available : pool;
      plan[day][key] = source[Math.floor(Math.random() * source.length)].id;
    });
  });
  save();
}
