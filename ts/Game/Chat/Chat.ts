import UUID from "../Tools/UUID.js";
import ChatMessage from "./ChatMessage.js";

class Chat {
	private _messageList: Map<string, ChatMessage>;
	private _keysIter: IterableIterator<string>;
	private _graphicMessageToDelete: Map<string, ChatMessage>;
	private _graphicMessageToAdd: Map<string, ChatMessage>;

	constructor() {
		this._messageList = new Map();
		this._keysIter = this._messageList.keys();

		this._graphicMessageToDelete = new Map();
		this._graphicMessageToAdd = new Map();
	}

	addChatMessage(text: string, type: string) {
		console.info(text);
		let uuid = UUID.generateUUID();
		let newMessage = new ChatMessage(text, type)
		this._messageList.set(uuid, newMessage);
		this._graphicMessageToAdd.set(uuid, newMessage);

		if (this._messageList.size > Chat.MAX_MESSAGES()) {
			let nextUUIDToDelete = this._keysIter.next().value;
			this._messageList.delete(nextUUIDToDelete);
			this._graphicMessageToDelete.set(nextUUIDToDelete, nextUUIDToDelete);
		}
	}

	getMessageList(): Map<string, ChatMessage> {return this._messageList;}

	getGraphicMessageToDelete(): Map<string, ChatMessage> {return this._graphicMessageToDelete;}
	resetGraphicMessageToDelete(): void {this._graphicMessageToDelete = new Map();}
	getGraphicMessageToAdd(): Map<string, ChatMessage> {return this._graphicMessageToAdd;}
	resetGraphicMessageToAdd(): void {this._graphicMessageToAdd = new Map();}

	static MAX_MESSAGES() {
		return 200;
	}
}
export default Chat;
