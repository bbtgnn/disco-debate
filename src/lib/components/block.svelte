<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Block } from '$lib/classes/block';
	import { data } from '$lib/stores/data';
	import { DataManager } from '$lib/classes/dataManager';

	const dispatch = createEventDispatcher<{ mouseUp: { selection: Selection | null } }>();
	function mouseUp() {
		dispatch('mouseUp', {
			selection: window.getSelection()
		});
	}

	export let block: Block;

	const dataManager = new DataManager($data);
	let referredToBy = dataManager.getBlockReferences(block.ID);
	let comments = dataManager.getBlockComments(block.ID);
</script>

<!--  -->

<div class="flex flex-row flex-nowrap items-stretch justify-start bg-zinc-700">
	<!-- References -->
	{#if block.references.length}
		<div class="select-none bg-zinc-600 shrink-0 space-y-1 py-4 px-1">
			{#each block.references as refID}
				<div class="w-full h-5 bg-red-500">{refID}</div>
			{/each}
		</div>
	{/if}

	<!-- Text -->
	<div class="space-y-2 grow p-4">
		<p on:mouseup={mouseUp}>
			{block.text}
		</p>
	</div>

	<!-- References -->
	{#if referredToBy.length}
		<div
			class="
				select-none bg-zinc-600 shrink-0 px-1 py-4 space-y-1
				flex flex-col flex-nowrap items-stretch justify-start 
			"
		>
			{#each referredToBy as ref}
				<div class=" h-5 bg-red-500">{ref.ID}</div>
			{/each}
		</div>
	{/if}

	<!-- Comments -->
	{#if comments.length}
		<div
			class="
				select-none bg-zinc-400 shrink-0 px-1 py-4 space-y-1
				flex flex-col flex-nowrap items-stretch justify-start 
			"
		>
			{#each comments as c}
				<div class=" h-5 bg-red-500">{c.ID}</div>
			{/each}
		</div>
	{/if}
</div>
