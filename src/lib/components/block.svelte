<script lang="ts">
	import type { Block } from '$lib/classes/block';
	import { Tile } from 'carbon-components-svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ mouseUp: { selection: Selection | null } }>();
	function mouseUp() {
		dispatch('mouseUp', {
			selection: window.getSelection()
		});
	}

	export let block: Block;
</script>

<!--  -->

<Tile>
	<div class="space-y-2">
		<p on:mouseup={mouseUp}>
			{block.text}
		</p>
		<p class="select-none"><span class="font-bold">ID:</span> {block.ID}</p>
		<p class="select-none">
			<span class="font-bold">refersTo:</span>
			{JSON.stringify(block.refersTo)}
		</p>
		<p class="select-none">
			<span class="font-bold">referredToBy:</span>
			{JSON.stringify(block.referredToBy)}
		</p>
	</div>
</Tile>
