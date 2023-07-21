var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChatMessage_instances, _ChatMessage_computeType, _ChatMessage_generateMapType;
class ChatMessage {
    constructor(text, type) {
        _ChatMessage_instances.add(this);
        this._text = text;
        this._type = type !== null && type !== void 0 ? type : ChatMessage.NONE();
        this._mapType = new Map();
        __classPrivateFieldGet(this, _ChatMessage_instances, "m", _ChatMessage_generateMapType).call(this);
    }
    getText() {
        return __classPrivateFieldGet(this, _ChatMessage_instances, "m", _ChatMessage_computeType).call(this) + " " + this._text;
    }
    //💥
    static GOLD() { return 'gold'; }
    static COUNT_DOWN() { return 'count-down'; }
    static SUCCES() { return 'succes'; }
    static FAILURE() { return 'failure'; }
    static LEVEL_START() { return 'level-start'; }
    static LEVEL_STOP() { return 'level-stop'; }
    static DIES() { return 'dies'; }
    static SWORD() { return 'sword'; }
    static ADD() { return 'add'; }
    static REMOVE() { return 'remove'; }
    static ERROR() { return 'error'; }
    static NONE() { return 'none'; }
}
_ChatMessage_instances = new WeakSet(), _ChatMessage_computeType = function _ChatMessage_computeType() {
    return this._mapType.get(this._type);
}, _ChatMessage_generateMapType = function _ChatMessage_generateMapType() {
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
    this._mapType.set(ChatMessage.NONE(), "");
};
export default ChatMessage;
//# sourceMappingURL=ChatMessage.js.map