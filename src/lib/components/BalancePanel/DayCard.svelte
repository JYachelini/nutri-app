<script>
  import { plan } from '$lib/stores/plan.svelte.js';
  import { recipes } from '$lib/data/recipes.svelte.js';
  import { TARGETS } from '$lib/data/constants.js';
  import { getDayTotals, getDayStatus, getDaySuggestions } from '$lib/utils/balance.js';

  let { day } = $props();

  const totals = $derived(getDayTotals(plan[day], recipes));
  const status = $derived(getDayStatus(totals));
  const suggestions = $derived(getDaySuggestions(totals));

  const borderColor = $derived({
    balanced: 'border-olive',
    high:     'border-terra',
    low:      'border-amber',
    empty:    'border-sand',
  }[status]);

  function pct(value, target) {
    return Math.min(100, Math.round((value / target) * 100));
  }
</script>

<div class="rounded-[14px] border-2 {borderColor} bg-warm-white p-4 transition-colors duration-300">
  <div class="text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3 font-serif">{day}</div>

  {#each [
    { label: 'Kcal',     value: totals.kcal,    target: TARGETS.kcal,    barClass: 'bg-terra' },
    { label: 'Proteína', value: totals.protein,  target: TARGETS.protein, barClass: 'bg-olive' },
    { label: 'HC',       value: totals.carbs,    target: TARGETS.carbs,   barClass: 'bg-amber' },
  ] as bar}
    <div class="mb-2.5">
      <div class="flex justify-between text-[11px] mb-1">
        <span class="text-ink-muted">{bar.label}</span>
        <span class="text-ink font-medium">{bar.value} / {bar.target}</span>
      </div>
      <div class="h-1.5 bg-sand-light rounded-full overflow-hidden relative">
        <div
          class="{bar.value > bar.target ? 'bg-red-warning' : bar.barClass} h-full rounded-full transition-all duration-300"
          style="width: {pct(bar.value, bar.target)}%"
        ></div>
      </div>
    </div>
  {/each}

  {#if suggestions.length}
    <div class="mt-2.5 pt-2.5 border-t border-sand text-[11px] text-ink-muted leading-relaxed space-y-1">
      {#each suggestions as tip}
        <div class="{tip.startsWith('Día equilibrado') ? 'text-olive' : ''}">{tip}</div>
      {/each}
    </div>
  {/if}
</div>
