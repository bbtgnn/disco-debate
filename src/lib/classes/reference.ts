import type { Range } from './range';

export class Reference {
	ID: string;
	blockID: string;
	range: Range;
	text: string;

	constructor(ID: string, blockID: string, range: Range, text: string) {
		this.ID = ID;
		this.blockID = blockID;
		this.range = range;
		this.text = text;
	}
}
