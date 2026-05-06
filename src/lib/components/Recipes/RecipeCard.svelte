<script>
  let { recipe, isSelecting, onSelect, onOpenModal } = $props();
</script>

<div
  class="bg-warm-white rounded-2xl border border-sand p-4 flex flex-col gap-3 transition-all duration-150 cursor-pointer hover:shadow-md hover:-translate-y-0.5"
  onclick={() => isSelecting ? onSelect(recipe.id) : onOpenModal(recipe)}
  role="button"
  tabindex="0"
  onkeydown={e => { if (e.key === 'Enter') isSelecting ? onSelect(recipe.id) : onOpenModal(recipe); }}
>
  <div class="flex items-start justify-between gap-2">
    <h3 class="font-serif text-[1rem] font-semibold leading-snug">{recipe.name}</h3>
    {#if isSelecting}
      <span class="text-[10px] px-2 py-0.5 rounded-full bg-olive text-white font-medium shrink-0">Seleccionar</span>
    {/if}
  </div>

  <div class="flex gap-1.5 flex-wrap">
    <span class="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-olive-pale text-olive">{recipe.protein}g prot</span>
    <span class="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-terra-pale text-terra">{recipe.kcal} kcal</span>
    <span class="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-amber-pale text-amber">{recipe.carbs}g HC</span>
    <span class="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-blue-pale text-blue-ocean">{recipe.fat}g lip</span>
  </div>

  {#if recipe.tags.length}
    <div class="flex gap-1.5 flex-wrap">
      {#each recipe.tags as tag}
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-sand-light text-ink-muted">{tag}</span>
      {/each}
    </div>
  {/if}
</div>
