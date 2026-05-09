<script>
  import { recipes } from '$lib/data/recipes.svelte.js';
  import RecipeCard from './RecipeCard.svelte';
  import RecipeModal from './RecipeModal.svelte';

  let { selectedSlot, onRecipeSelected, cancelSelection } = $props();

  let search = $state('');
  let typeFilter = $state('');
  let sortKey = $state('');
  let modalRecipe = $state(null);

  $effect(() => {
    if (selectedSlot) {
      typeFilter = (selectedSlot.meal === 'breakfast' || selectedSlot.meal === 'snack')
        ? 'breakfast'
        : 'lunch';
    }
  });

  const filtered = $derived.by(() => {
    let list = recipes.filter(r => {
      if (typeFilter && r.type !== typeFilter) return false;
      if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sortKey) {
      case 'protein-desc': list = [...list].sort((a, b) => b.protein - a.protein); break;
      case 'protein-asc':  list = [...list].sort((a, b) => a.protein - b.protein); break;
      case 'kcal-asc':     list = [...list].sort((a, b) => a.kcal - b.kcal);    break;
      case 'kcal-desc':    list = [...list].sort((a, b) => b.kcal - a.kcal);    break;
      case 'carbs-asc':    list = [...list].sort((a, b) => a.carbs - b.carbs);  break;
      case 'name':         list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  });
</script>

<!-- Selector banner -->
{#if selectedSlot}
  <div class="bg-olive-pale border border-olive rounded-xl p-3.5 mb-5 flex items-center justify-between gap-4 text-[13px]">
    <span class="text-olive">
      Seleccionando para <strong>{selectedSlot.day} — {selectedSlot.meal === 'breakfast' ? 'Desayuno' : selectedSlot.meal === 'lunch' ? 'Almuerzo' : selectedSlot.meal === 'snack' ? 'Merienda' : 'Cena'}</strong>. Hacé click en una receta para asignarla.
    </span>
    <button
      class="text-[12px] px-3 py-1.5 rounded-lg border border-olive text-olive hover:bg-olive hover:text-white transition-colors cursor-pointer"
      onclick={cancelSelection}
    >Cancelar</button>
  </div>
{/if}

<!-- Toolbar -->
<div class="flex gap-3 flex-wrap mb-6">
  <input
    type="text"
    placeholder="Buscar receta..."
    bind:value={search}
    class="flex-1 min-w-[200px] px-4 py-2.5 rounded-[10px] border border-sand bg-warm-white text-[13px] text-ink placeholder:text-ink-faint outline-none focus:border-olive transition-colors"
  />
  <select
    bind:value={typeFilter}
    class="px-4 py-2.5 rounded-[10px] border border-sand bg-warm-white text-[13px] text-ink outline-none focus:border-olive transition-colors cursor-pointer"
  >
    <option value="">Todas las comidas</option>
    <option value="breakfast">Desayuno / Merienda</option>
    <option value="lunch">Almuerzo / Cena</option>
  </select>
  <select
    bind:value={sortKey}
    class="px-4 py-2.5 rounded-[10px] border border-sand bg-warm-white text-[13px] text-ink outline-none focus:border-olive transition-colors cursor-pointer"
  >
    <option value="">Ordenar por</option>
    <option value="protein-desc">Mayor proteína</option>
    <option value="protein-asc">Menor proteína</option>
    <option value="kcal-asc">Menos calorías</option>
    <option value="kcal-desc">Más calorías</option>
    <option value="carbs-asc">Menos hidratos</option>
    <option value="name">Nombre A–Z</option>
  </select>
</div>

<!-- Grid -->
{#if filtered.length === 0}
  <div class="text-center py-16 text-ink-faint italic text-[14px]">No hay recetas que coincidan.</div>
{:else}
  <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
    {#each filtered as recipe (recipe.id)}
      <RecipeCard
        {recipe}
        isSelecting={!!selectedSlot}
        onSelect={onRecipeSelected}
        onOpenModal={r => { modalRecipe = r; }}
      />
    {/each}
  </div>
{/if}

<!-- Modal -->
{#if modalRecipe}
  <RecipeModal recipe={modalRecipe} onClose={() => { modalRecipe = null; }} />
{/if}
