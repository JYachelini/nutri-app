<script>
  import { recipes } from '$lib/data/recipes.js';
  import { removeMeal } from '$lib/stores/plan.svelte.js';

  let { day, mealKey, mealLabel, recipeId, onAddClick } = $props();

  const recipe = $derived(recipeId ? recipes.find(r => r.id === recipeId) : null);
</script>

<div
  class="p-3.5 px-4 border-r border-b border-sand-light min-h-[90px] flex flex-col gap-2 transition-colors duration-150
    {recipe ? 'cursor-default' : 'cursor-pointer hover:bg-cream'}"
  onclick={() => { if (!recipe) onAddClick(day, mealKey); }}
  role="button"
  tabindex="0"
  onkeydown={e => { if (e.key === 'Enter' && !recipe) onAddClick(day, mealKey); }}
>
  <div class="text-[10px] font-medium uppercase tracking-widest text-ink-faint">
    {mealLabel}
  </div>

  {#if recipe}
    <div class="text-[13px] text-ink leading-snug">{recipe.name}</div>
    <div class="flex gap-1.5 flex-wrap mt-auto">
      <span class="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-olive-pale text-olive">{recipe.protein}g</span>
      <span class="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-terra-pale text-terra">{recipe.kcal}kcal</span>
    </div>
    <div class="flex gap-1 mt-1">
      <button
        class="text-[11px] px-2 py-1 rounded-lg border border-transparent text-ink-muted hover:text-ink hover:bg-sand-light transition-colors duration-150 cursor-pointer"
        onclick={e => { e.stopPropagation(); onAddClick(day, mealKey); }}
      >cambiar</button>
      <button
        class="text-[11px] px-2 py-1 rounded-lg border border-transparent text-terra hover:bg-terra-pale transition-colors duration-150 cursor-pointer"
        onclick={e => { e.stopPropagation(); removeMeal(day, mealKey); }}
      >quitar</button>
    </div>
  {:else}
    <div class="text-[12px] text-ink-faint italic">+ agregar</div>
  {/if}
</div>
