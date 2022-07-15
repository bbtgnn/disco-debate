<script lang="ts">
	import type { Block } from '$lib/classes/block';
	import { data } from '$lib/stores/data';
	import { DataManager } from '$lib/classes/dataManager';

	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher<{ mouseUp: { selection: Selection | null } }>();
	function mouseUp() {
		dispatch('mouseUp', {
			selection: window.getSelection()
		});
	}

	export let block: Block;

	const dataManager = new DataManager($data);
	let referredToBy = dataManager.getBlockReferences(block.ID);
</script>

<!--  -->

<div class="flex flex-row flex-nowrap items-stretch justify-start bg-zinc-700">
	<!-- References -->
	<div class="select-none bg-zinc-600 w-10 shrink-0">
		{#each block.references as refID}
			<div class="w-full h-5 bg-red-500">{refID}</div>
		{/each}
	</div>

	<!-- Text -->
	<div class="space-y-2 grow p-4">
		<p on:mouseup={mouseUp}>
			{block.text}
		</p>
		{JSON.stringify(block.references)}
		{JSON.stringify(referredToBy)}
	</div>

	<!-- References -->
	<div
		class="
			select-none bg-zinc-600 w-10 shrink-0 px-2 py-4
			flex flex-col flex-nowrap items-stretch justify-start space-y-2	
		"
	>
		{#each referredToBy as ref}
			<div class=" h-5 bg-red-500" />
		{/each}
	</div>
</div>
