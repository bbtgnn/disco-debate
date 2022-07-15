import type { Block } from './block';
import type { Reference } from './reference';
import { DataStructure } from './dataStructure';
import _ from 'lodash';

//

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

	getBlockReferences(blockID: string): Array<Reference> {
		return _.filter(this.data.references, (r) => r.blockID == blockID);
	}

	//

	addReference(r: Reference) {
		this.data.references.push(r);
	}

	addReferences(a: Array<Reference>) {
		this.data.references.push(...a);
	}

	findReference(ID: string): Reference | undefined {
		return _.find(this.data.references, (r) => r.ID == ID);
	}
}
