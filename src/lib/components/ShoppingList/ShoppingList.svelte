<script>
  import { plan } from '$lib/stores/plan.svelte.js';
  import { recipes } from '$lib/data/recipes.svelte.js';
  import { generateShoppingList } from '$lib/utils/shoppingList.js';

  const grouped = $derived(generateShoppingList(plan, recipes));

  const stats = $derived.by(() => {
    let planned = 0;
    let totalKcal = 0;
    let totalProtein = 0;

    Object.values(plan).forEach(day => {
      Object.values(day).filter(Boolean).forEach(id => {
        const r = recipes.find(r => r.id === id);
        if (!r) return;
        planned++;
        totalKcal += r.kcal;
        totalProtein += r.protein;
      });
    });

    return {
      planned,
      avgKcal: planned ? Math.round(totalKcal / planned) : 0,
      avgProtein: planned ? Math.round(totalProtein / planned) : 0,
    };
  });

  const hasItems = $derived(Object.values(grouped).some(cat => cat.items.length > 0));
</script>

{#if !hasItems}
  <div class="text-center py-20 text-ink-faint italic text-[14px]">
    El plan está vacío. Completá la semana para ver la lista de compras.
  </div>
{:else}
  <!-- Stats -->
  <div class="grid grid-cols-3 gap-4 mb-8">
    {#each [
      { label: 'Comidas planificadas', value: stats.planned },
      { label: 'Kcal promedio/comida',  value: stats.avgKcal },
      { label: 'Proteína promedio/comida', value: `${stats.avgProtein}g` },
    ] as stat}
      <div class="bg-warm-white rounded-2xl border border-sand p-4 text-center">
        <div class="font-serif text-2xl font-semibold text-ink">{stat.value}</div>
        <div class="text-[11px] text-ink-muted mt-1">{stat.label}</div>
      </div>
    {/each}
  </div>

  <!-- Categories -->
  <div class="flex flex-col gap-5">
    {#each Object.entries(grouped) as [key, { label, items }]}
      {#if items.length}
        <div class="bg-warm-white rounded-2xl border border-sand p-5">
          <h3 class="font-serif text-[1rem] font-semibold mb-3 text-ink">{label}</h3>
          <ul class="space-y-2">
            {#each items as item}
              <li class="flex justify-between items-start text-[13px] border-b border-sand-light pb-2">
                <span class="text-ink">{item.name}</span>
                <span class="text-ink-muted text-right ml-4">
                  {item.amounts.length === 1
                    ? item.amounts[0]
                    : `×${item.amounts.length} (${item.amounts.join(', ')})`}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    {/each}
  </div>
{/if}
