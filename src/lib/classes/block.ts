export class Block {
	ID: string;
	text: string | null;
	references: Array<string>;

	constructor(id: string, text: string | null = null, references: Array<string> = []) {
		this.ID = id;
		this.text = text;
		this.references = references;
	}
}
