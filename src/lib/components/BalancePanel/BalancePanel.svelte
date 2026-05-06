<script>
  import { DAYS, TARGETS } from '$lib/data/constants.js';
  import { plan } from '$lib/stores/plan.svelte.js';
  import { recipes } from '$lib/data/recipes.js';
  import { getDayTotals, getWeeklyAverage } from '$lib/utils/balance.js';
  import DayCard from './DayCard.svelte';

  const allTotals = $derived(DAYS.map(day => getDayTotals(plan[day], recipes)));
  const weekly = $derived(getWeeklyAverage(allTotals));
</script>

<div class="flex flex-col gap-3">
  <div class="text-[11px] font-medium uppercase tracking-widest text-ink-muted">Balance diario</div>

  {#each DAYS as day}
    <DayCard {day} />
  {/each}

  <!-- Weekly summary -->
  <div class="bg-cream rounded-xl border border-sand p-4 mt-1">
    <div class="text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">Promedio semanal</div>
    <div class="grid grid-cols-2 gap-4">
      {#each [
        { label: 'Kcal',     value: weekly.kcal,    target: TARGETS.kcal },
        { label: 'Proteína', value: weekly.protein,  target: TARGETS.protein },
        { label: 'Hidratos', value: weekly.carbs,    target: TARGETS.carbs },
        { label: 'Grasas',   value: weekly.fat,      target: TARGETS.fat },
      ] as item}
        <div>
          <div class="text-[10px] text-ink-muted mb-0.5">{item.label}</div>
          <div class="text-[13px] font-medium text-ink">{item.value}</div>
          <div class="text-[10px] text-ink-faint">meta: {item.target}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
