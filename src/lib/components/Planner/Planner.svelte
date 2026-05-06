<script>
  import { DAYS } from '$lib/data/constants.js';
  import DayBlock from './DayBlock.svelte';
  import BalancePanel from '$lib/components/BalancePanel/BalancePanel.svelte';

  let { openRecipes } = $props();
</script>

<div class="grid grid-cols-[1fr_320px] gap-6 items-start max-[750px]:grid-cols-1">
  <div class="min-w-0 flex flex-col gap-5">
    {#each DAYS as day}
      <DayBlock {day} onAddClick={openRecipes} />
    {/each}
  </div>
  <div class="sticky top-5 max-[750px]:static">
    <BalancePanel />
  </div>
</div>
