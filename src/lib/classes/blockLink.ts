import type { Range } from './range';

export class BlockLink {
	ID: string;
	sourceID: string;
	targetID: string;
	range: Range;

	constructor(ID: string, sourceID: string, targetID: string, range: Range) {
		this.ID = ID;
		this.sourceID = sourceID;
		this.targetID = targetID;
		this.range = range;
	}
}
