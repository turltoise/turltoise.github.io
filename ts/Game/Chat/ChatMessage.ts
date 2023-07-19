class ChatMessage {
	private _text: string;
	private _type: string;
	private _mapType: Map<string, string>;

	constructor(text: string, type: string) {
		this._text = text;
		this._type = type;
		this._mapType = new Map();
		this.#generateMapType();
	}

	getText(): string {
		return this.#computeType()+" "+this._text;
	}

	#computeType(): string {
		return this._mapType.get(this._type);
	}

	#generateMapType(): void {
		this._mapType.set(ChatMessage.GOLD(), "💰");
		this._mapType.set(ChatMessage.COUNT_DOWN(), "⏱");
		this._mapType.set(ChatMessage.SUCCES(), "🟢");
		this._mapType.set(ChatMessage.FAILURE(), "🔴");
		this._mapType.set(ChatMessage.LEVEL_START(), "🏳");
		this._mapType.set(ChatMessage.LEVEL_STOP(), "🏴");
		this._mapType.set(ChatMessage.DIES(), "💀");
		this._mapType.set(ChatMessage.SWORD(), "⚔️");
		this._mapType.set(ChatMessage.ADD(), "➕");
		this._mapType.set(ChatMessage.REMOVE(), "➖");
		this._mapType.set(ChatMessage.ERROR(), "❗");
	}
	//💥

	static GOLD(): string {return 'gold';}
	static COUNT_DOWN(): string {return 'count-down';}
	static SUCCES(): string {return 'succes';}
	static FAILURE(): string {return 'failure';}
	static LEVEL_START(): string {return 'level-start';}
	static LEVEL_STOP(): string {return 'level-stop';}
	static DIES(): string {return 'dies';}
	static SWORD(): string {return 'sword';}
	static ADD(): string {return 'add';}
	static REMOVE(): string {return 'remove';}
	static ERROR(): string {return 'error';}

}
export default ChatMessage;