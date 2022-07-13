import type { Block } from './block';
import type { Reference } from './reference';

export class DataStructure {
	blocks: Array<Block>;
	references: Array<Reference>;

	constructor() {
		this.blocks = [];
		this.references = [];
	}
}
