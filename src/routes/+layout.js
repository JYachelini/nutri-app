export const ssr = false;
export const prerender = false;

import { loadRecipes } from '$lib/data/recipes.svelte.js';

export async function load() {
  await loadRecipes();
  return {};
}
