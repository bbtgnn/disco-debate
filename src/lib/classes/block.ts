export class Block {
	ID: string;
	text: string | null;
	references: Array<string>;
	depth: number;

	constructor(id: string, text: string | null = null, references: Array<string> = [], depth = 0) {
		this.ID = id;
		this.text = text;
		this.references = references;
		this.depth = depth;
	}
}
