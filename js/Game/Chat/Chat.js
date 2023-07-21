import UUID from "../Tools/UUID.js";
import ChatMessage from "./ChatMessage.js";
class Chat {
    constructor() {
        this._messageList = new Map();
        this._keysIter = this._messageList.keys();
        this._graphicMessageToDelete = new Map();
        this._graphicMessageToAdd = new Map();
    }
    addChatMessage(text, type) {
        //console.info(text);
        let uuid = UUID.generateUUID();
        let newMessage = new ChatMessage(text, type);
        this._messageList.set(uuid, newMessage);
        this._graphicMessageToAdd.set(uuid, newMessage);
        if (this._messageList.size > Chat.MAX_MESSAGES()) {
            let nextUUIDToDelete = this._keysIter.next().value;
            this._messageList.delete(nextUUIDToDelete);
            this._graphicMessageToDelete.set(nextUUIDToDelete, nextUUIDToDelete);
        }
    }
    getMessageList() { return this._messageList; }
    getGraphicMessageToDelete() { return this._graphicMessageToDelete; }
    resetGraphicMessageToDelete() { this._graphicMessageToDelete = new Map(); }
    getGraphicMessageToAdd() { return this._graphicMessageToAdd; }
    resetGraphicMessageToAdd() { this._graphicMessageToAdd = new Map(); }
    static MAX_MESSAGES() {
        return 200;
    }
}
export default Chat;
//# sourceMappingURL=Chat.js.map