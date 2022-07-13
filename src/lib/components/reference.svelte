<script lang="ts">
	import { Tile, Button } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	import type { Reference } from '$lib/classes/reference';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ discard: {} }>();

	function discard() {
		dispatch('discard', {});
	}

	export let reference: Reference;
</script>

<!--  -->

<Tile>
	<div class="flex flex-row space-x-2 p-1 items-start">
		<p class="grow">
			{reference.text}
		</p>

		<!-- Discard button -->
		<Button
			kind="secondary"
			on:click={discard}
			icon={TrashCan}
			iconDescription="Discard selection"
		/>
	</div>
</Tile>
