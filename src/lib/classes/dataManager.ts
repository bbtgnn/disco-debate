import { Block } from './block';
import { Reference } from './reference';
import { DataStructure } from './dataStructure';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import type { Range } from './range';

//

export class DataManager {
	data: DataStructure;

	constructor(data: DataStructure = new DataStructure()) {
		this.data = data;
	}

	// Data load

	setDataStructure(data: DataStructure) {
		this.data = data;
	}

	// Reference utilities

	addReference(r: Reference) {
		this.data.references.push(r);
	}

	addReferences(a: Array<Reference>) {
		this.data.references.push(...a);
	}

	getReference(ID: string): Reference | undefined {
		return _.find(this.data.references, (r) => r.ID == ID);
	}

	getReferenceDepth(ref: Reference): number | undefined {
		return this.getBlock(ref.blockID)?.depth;
	}

	createReference(blockID: string, range: Range, text: string): Reference {
		return new Reference(nanoid(5), blockID, range, text);
	}

	// Block utilities

	addBlock(b: Block) {
		this.data.blocks.push(b);
	}

	addBlocks(a: Array<Block>) {
		this.data.blocks.push(...a);
	}

	getBlock(ID: string): Block | undefined {
		return _.find(this.data.blocks, (b) => b.ID == ID);
	}

	createBlock(text: string | null = null, references: Array<string> = []): Block {
		// Listing all the depths
		const depths: Array<number> = [0];

		// Get references depth
		references.forEach((refID) => {
			const ref = this.getReference(refID);
			if (ref) {
				const depth = this.getReferenceDepth(ref);
				if (depth) {
					depths.push(depth);
				}
			}
		});

		// Calculating depth (by adding one!)
		const depth = Math.max(...depths) + 1;

		return new Block(nanoid(5), text, references, depth);
	}

	//

	getBlockReferences(blockID: string): Array<Reference> {
		return _.filter(this.data.references, (r) => r.blockID == blockID);
	}

	getReferenceBlocks(refID: string): Array<Block> {
		return _.filter(this.data.blocks, (b) => b.references.includes(refID));
	}

	getBlockComments(blockID: string): Array<Block> {
		const references = this.getBlockReferences(blockID);
		const blocks: Array<Block> = [];
		references.forEach((r) => {
			blocks.push(...this.getReferenceBlocks(r.ID));
		});
		return _.uniq(blocks);
	}

	getBlockDepth(blockID: string): number {
		const references = this.getBlockReferences(blockID);
		const depths: Array<number> = [0];
		for (let r of references) {
			const blocks = this.getReferenceBlocks(r.ID);
			const blockDepths = blocks.map((b) => b.depth);
			depths.push(...blockDepths);
		}
		return Math.max(...depths);
	}
}
