import { base } from '$app/paths';

export const recipes = $state([]);

export async function loadRecipes() {
  if (recipes.length > 0) return;
  try {
    const res = await fetch(`${base}/recipes.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    recipes.push(...data);
  } catch (e) {
    console.error('Failed to load recipes.json:', e);
  }
}
