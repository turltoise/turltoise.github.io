var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Beach_instances, _Beach_generateWorldLevelOne, _Beach_generateWorldLevelTwo, _Beach_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Beach extends AbstractWorld {
    constructor(state, title = "Title", background = "Background") {
        super(state, title, background);
        _Beach_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Beach_instances, "m", _Beach_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Beach_instances, "m", _Beach_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Beach_instances, "m", _Beach_generateWorldLevelThree).call(this));
    }
}
_Beach_instances = new WeakSet(), _Beach_generateWorldLevelOne = function _Beach_generateWorldLevelOne() {
    return new WorldLevel();
}, _Beach_generateWorldLevelTwo = function _Beach_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Beach_generateWorldLevelThree = function _Beach_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Beach;
//# sourceMappingURL=Beach.js.map