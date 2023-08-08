var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChatMessage_instances, _ChatMessage_generateColorMapForType;
class ChatMessage {
    constructor(text, type) {
        _ChatMessage_instances.add(this);
        this._text = text;
        this._type = type !== null && type !== void 0 ? type : ChatMessage.NONE();
        this._colorList = new Map();
        __classPrivateFieldGet(this, _ChatMessage_instances, "m", _ChatMessage_generateColorMapForType).call(this);
    }
    getText() {
        return this._text;
    }
    getColor() {
        return this._colorList.get(this._type);
    }
    static COMBAT() { return 'combat'; }
    static BOOSTER() { return 'booster'; }
    static COLLECTION() { return 'collection'; }
    static NONE() { return 'none'; }
}
_ChatMessage_instances = new WeakSet(), _ChatMessage_generateColorMapForType = function _ChatMessage_generateColorMapForType() {
    this._colorList.set(ChatMessage.COMBAT(), "blue");
    this._colorList.set(ChatMessage.BOOSTER(), "black");
    this._colorList.set(ChatMessage.COLLECTION(), "red");
    this._colorList.set(ChatMessage.COLLECTION(), "green");
};
export default ChatMessage;
//# sourceMappingURL=ChatMessage.js.map