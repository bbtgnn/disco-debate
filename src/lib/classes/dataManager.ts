import type { Block } from './block';
import type { Reference } from './reference';
import { DataStructure } from './dataStructure';

export class DataManager {
	data: DataStructure;

	constructor(data: DataStructure = new DataStructure()) {
		this.data = data;
	}

	//

	setDataStructure(data: DataStructure) {
		this.data = data;
	}

	//

	addBlock(b: Block) {
		this.data.blocks.push(b);
	}

	addBlocks(a: Array<Block>) {
		this.data.blocks.push(...a);
	}

	//

	addReference(r: Reference) {
		this.data.references.push(r);
	}

	addReferences(a: Array<Reference>) {
		this.data.references.push(...a);
	}
}
