class ChatMessage {
	private _text: string;
	private _type: string;
	private _colorList: Map<string, string>;

	constructor(text: string, type: string) {
		this._text = text;
		this._type = type ?? ChatMessage.NONE();
		this._colorList = new Map();
		this.#generateColorMapForType();
	}

	getText(): string {
		return this._text;
	}

	getColor(): string {
		return this._colorList.get(this._type);
	}

	#generateColorMapForType(): void {
		this._colorList.set(ChatMessage.COMBAT(), "blue");
		this._colorList.set(ChatMessage.BOOSTER(), "black");
		this._colorList.set(ChatMessage.COLLECTION(), "red");
		this._colorList.set(ChatMessage.COLLECTION(), "green");
	}

	static COMBAT(): string {return 'combat';}
	static BOOSTER(): string {return 'booster';}
	static COLLECTION(): string {return 'collection';}
	static NONE(): string {return 'none';}
}
export default ChatMessage;