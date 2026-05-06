<script>
  let { recipe, onClose } = $props();
</script>

<!-- Overlay -->
<div
  class="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-end justify-center"
  onclick={e => { if (e.target === e.currentTarget) onClose(); }}
  role="dialog"
  aria-modal="true"
>
  <div class="bg-warm-white rounded-t-[20px] w-full max-w-[900px] max-h-[80vh] overflow-y-auto p-7 pb-10 animate-[slideUp_0.25s_ease]">
    <div class="flex justify-between items-start mb-5">
      <div>
        <h2 class="font-serif text-2xl font-semibold">{recipe.name}</h2>
        <p class="text-[13px] text-ink-muted mt-1">
          {recipe.type === 'breakfast' ? 'Desayuno / Merienda' : 'Almuerzo / Cena'}
        </p>
      </div>
      <button
        class="text-2xl text-ink-muted hover:text-ink leading-none cursor-pointer transition-colors"
        onclick={onClose}
        aria-label="Cerrar"
      >×</button>
    </div>

    <!-- Macros -->
    <div class="flex gap-2 flex-wrap mb-6">
      <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-terra-pale text-terra">{recipe.kcal} kcal</span>
      <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-olive-pale text-olive">{recipe.protein}g proteína</span>
      <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-amber-pale text-amber">{recipe.carbs}g hidratos</span>
      <span class="px-3 py-1 rounded-full text-[11px] font-medium bg-blue-pale text-blue-ocean">{recipe.fat}g lípidos</span>
    </div>

    {#if recipe.tags.length}
      <div class="flex gap-1.5 flex-wrap mb-5">
        {#each recipe.tags as tag}
          <span class="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide bg-sand-light text-ink-muted">{tag}</span>
        {/each}
      </div>
    {/if}

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <!-- Ingredients -->
      <div>
        <h3 class="text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">Ingredientes</h3>
        <ul class="space-y-2">
          {#each recipe.ingredients as ing}
            <li class="flex justify-between text-[13px] border-b border-sand-light pb-1.5">
              <span class="text-ink">{ing.name}</span>
              <span class="text-ink-muted">{ing.amount}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Steps -->
      <div>
        <h3 class="text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">Preparación</h3>
        <ol class="space-y-2 list-decimal list-inside">
          {#each recipe.steps as step}
            <li class="text-[13px] text-ink leading-relaxed">{step}</li>
          {/each}
        </ol>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes slideUp {
    from { transform: translateY(40px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
</style>
