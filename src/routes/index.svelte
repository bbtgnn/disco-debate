<script lang="ts">
	import { data } from '$lib/stores/data';

	import { Button, TextArea, Tile } from 'carbon-components-svelte';
	import BlockUI from '$lib/components/block.svelte';
	import ReferenceUI from '$lib/components/reference.svelte';

	import { DataManager } from '$lib/classes/dataManager';
	import type { Reference } from '$lib/classes/reference';
	import type { Block } from '$lib/classes/block';

	import Add from 'carbon-icons-svelte/lib/Add.svelte';

	/**
	 * Block manager setup
	 */

	let dataManager = new DataManager();

	// Loading data
	if ($data) {
		dataManager.setDataStructure($data);
	}

	// Updating saved data
	$: $data = dataManager.data;

	/**
	 * Adding block
	 */

	// Variables to store current text and references
	let text = '';
	let references: Array<Reference> = [];

	// Tracks if the adding block is valid
	let canAddBlock = false;
	$: canAddBlock = references.length > 0 || text !== '';

	// Tracks if is editing mode
	let addingBlock = false;

	function openAddBlock() {
		addingBlock = true;
	}

	function closeAddBlock() {
		addingBlock = false;
		// TODO: show modal if temp content is not empty
		dataManager = dataManager;
		text = '';
		references = [];
	}

	function addBlock() {
		if (canAddBlock && dataManager) {
			// Adding references
			references.forEach((r) => {
				dataManager.addReference(r);
			});

			// Getting list with all the references IDs
			const referencesID: Array<string> = references.map((r) => r.ID);

			// Creating and adding block
			const block = dataManager.createBlock(text, referencesID);
			dataManager.addBlock(block);

			// Closing window
			closeAddBlock();
		}
	}

	/**
	 * References management
	 */

	function addReference(block: Block, sel: Selection | null) {
		if (addingBlock && sel && sel.toString() !== '') {
			// Creating reference
			const ref = dataManager.createReference(
				block.ID,
				{
					start: sel.anchorOffset,
					end: sel.focusOffset
				},
				sel.toString()
			);

			// Adding to selection
			references = [...references, ref];
		}
	}

	function delReference(i: number) {
		references.splice(i, 1);
		references = references;
	}
</script>

<!--  -->

<!-- All the blocks -->
<div class="flex flex-row flex-nowrap h-screen items-stretch">
	<!-- List of the blocks -->
	<div class="p-6 space-y-4 flex flex-col justify-start items-start grow">
		<!-- Section title -->
		<h4 class="shrink-0">Blocks</h4>

		<!-- Column container -->
		<div
			class="
				grow overflow-y-scroll
				flex flex-row flex-nowrap items-stretch justify-start
			"
		>
			<!-- The column -->
			<div class="w-[500px] space-y-4 pr-4">
				{#each $data.blocks as block}
					<BlockUI
						{block}
						on:mouseUp={(e) => {
							addReference(block, e.detail.selection);
						}}
					/>
				{/each}
			</div>
		</div>
	</div>

	<!-- Add block panel -->
	{#if addingBlock}
		<div class="w-[400px] shrink-0 flex flex-row items-stretch justify-start">
			<Tile light>
				<div class="p-2 space-y-4">
					<!-- Title -->
					<h4>Add block</h4>

					<!-- Text -->
					<TextArea name="newText" id="newText" bind:value={text} />

					<!-- Selections -->
					<div class="space-y-2">
						{#each references as reference, r (reference.ID)}
							<ReferenceUI
								{reference}
								on:discard={() => {
									delReference(r);
								}}
							/>
						{/each}
					</div>

					<!-- Confirm buttons -->
					<div class="flex flex-row justify-end space-x-2">
						<Button kind="secondary" on:click={closeAddBlock}>Undo</Button>
						<Button on:click={addBlock} disabled={!canAddBlock}>Create Block</Button>
					</div>
				</div>
			</Tile>
		</div>
	{/if}
</div>

<!-- Add block button -->
{#if !addingBlock}
	<div class="fixed right-6 bottom-6">
		<Button on:click={openAddBlock} icon={Add}>Create Block</Button>
	</div>
{/if}
