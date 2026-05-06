<script>
  import { recipes } from '$lib/data/recipes.js';
  import { plan } from '$lib/stores/plan.svelte.js';
  import { MEALS } from '$lib/data/constants.js';
  import { getDayTotals } from '$lib/utils/balance.js';
  import MealSlot from './MealSlot.svelte';

  let { day, onAddClick } = $props();

  const dayMeals = $derived(plan[day]);
  const totals = $derived(getDayTotals(dayMeals, recipes));
  const hasAny = $derived(Object.values(dayMeals).some(Boolean));
</script>

<div class="bg-warm-white rounded-2xl border border-sand overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
  <div class="px-5 py-3.5 bg-sand-light border-b border-sand flex items-center justify-between font-serif text-[1.1rem] font-semibold tracking-wide">
    <span>{day}</span>
    {#if hasAny}
      <span class="font-sans text-[12px] text-ink-muted font-light">{totals.kcal} kcal · {totals.protein}g prot</span>
    {:else}
      <span class="font-sans text-[12px] text-ink-faint font-light">Sin planificar</span>
    {/if}
  </div>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
    {#each MEALS as meal}
      <MealSlot
        {day}
        mealKey={meal.key}
        mealLabel={meal.label}
        recipeId={dayMeals[meal.key]}
        {onAddClick}
      />
    {/each}
  </div>
</div>
