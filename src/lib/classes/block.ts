// import type { BlockLink } from './blockLink';

export class Block {
	ID: string;
	text: string | null;
	refersTo: Array<string>;
	referredToBy: Array<string>;

	constructor(
		id: string,
		text: string | null = null,
		refersTo: Array<string> = [],
		referredToBy: Array<string> = []
	) {
		this.ID = id;
		this.text = text;
		this.refersTo = refersTo;
		this.referredToBy = referredToBy;
	}
}
