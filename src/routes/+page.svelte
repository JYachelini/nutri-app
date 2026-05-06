<script>
  import { plan, autofill, clearPlan, assignMeal } from '$lib/stores/plan.svelte.js';
  import Planner from '$lib/components/Planner/Planner.svelte';
  import Recipes from '$lib/components/Recipes/Recipes.svelte';
  import ShoppingList from '$lib/components/ShoppingList/ShoppingList.svelte';

  let activeTab = $state('plan');
  let selectedSlot = $state(null); // { day: string, meal: string } | null

  function openRecipes(slot) {
    selectedSlot = slot;
    activeTab = 'recetas';
  }

  function handleRecipeSelected(recipeId) {
    if (selectedSlot) {
      assignMeal(selectedSlot.day, selectedSlot.meal, recipeId);
      selectedSlot = null;
      activeTab = 'plan';
    }
  }

  function cancelSelection() {
    selectedSlot = null;
  }
</script>

<div class="min-h-screen bg-cream relative">
  <!-- Grain overlay -->
  <div class="grain fixed inset-0 pointer-events-none z-0 opacity-60"></div>

  <div class="relative z-10 max-w-[900px] mx-auto px-5 pb-16">
    <!-- Header -->
    <header class="pt-10 pb-8 border-b border-sand mb-9 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="font-serif text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tracking-tight">
          Mi plan <em class="italic text-olive">nutricional</em>
        </h1>
        <p class="text-[13px] text-ink-muted mt-2 tracking-wide">
          Julian Yachelini · Pescetariano · Objetivo: descenso de masa adiposa
        </p>
      </div>
      <div class="flex gap-1.5 flex-wrap">
        <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-terra-pale text-terra">2000 kcal</span>
        <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-olive-pale text-olive">100g proteína</span>
        <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-amber-pale text-amber">150g hidratos</span>
        <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-blue-pale text-blue-ocean">60g lípidos</span>
      </div>
    </header>

    <!-- Nav -->
    <nav class="flex gap-0.5 bg-sand-light rounded-xl p-1 mb-8 w-fit">
      {#each [['plan','Planificador'],['recetas','Recetas'],['compras','Lista de compras']] as [tab, label]}
        <button
          class="px-5 py-2 rounded-[9px] text-[13px] transition-all duration-200 cursor-pointer
            {activeTab === tab
              ? 'bg-warm-white text-ink font-medium shadow-sm'
              : 'bg-transparent text-ink-muted font-normal hover:text-ink'}"
          onclick={() => { activeTab = tab; if (tab !== 'recetas') selectedSlot = null; }}
        >
          {label}
        </button>
      {/each}
    </nav>

    <!-- Sections -->
    {#if activeTab === 'plan'}
      <div class="flex gap-2.5 mb-7 flex-wrap items-center">
        <button
          class="px-5 py-2.5 rounded-[10px] text-[13px] font-medium cursor-pointer transition-all duration-150 bg-olive text-white border border-olive hover:bg-[#3d5030]"
          onclick={autofill}
        >
          Autocompletar semana
        </button>
        <button
          class="px-5 py-2.5 rounded-[10px] text-[13px] font-medium cursor-pointer transition-all duration-150 bg-warm-white border border-sand text-ink hover:border-ink-muted hover:bg-cream"
          onclick={clearPlan}
        >
          Limpiar
        </button>
        <button
          class="px-5 py-2.5 rounded-[10px] text-[13px] font-medium cursor-pointer transition-all duration-150 bg-warm-white border border-sand text-ink hover:border-ink-muted hover:bg-cream"
          onclick={() => { activeTab = 'compras'; }}
        >
          Ver compras →
        </button>
      </div>
      <Planner {openRecipes} />
    {:else if activeTab === 'recetas'}
      <Recipes {selectedSlot} onRecipeSelected={handleRecipeSelected} {cancelSelection} />
    {:else}
      <ShoppingList />
    {/if}
  </div>
</div>
