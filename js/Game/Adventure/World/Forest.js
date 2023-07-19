var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Forest_instances, _Forest_generateWorldLevelOne, _Forest_generateWorldLevelTwo, _Forest_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Forest extends AbstractWorld {
    constructor(title = "Title", background = "Background") {
        super(title, background);
        _Forest_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Forest_instances, "m", _Forest_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Forest_instances, "m", _Forest_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Forest_instances, "m", _Forest_generateWorldLevelThree).call(this));
    }
}
_Forest_instances = new WeakSet(), _Forest_generateWorldLevelOne = function _Forest_generateWorldLevelOne() {
    return new WorldLevel();
}, _Forest_generateWorldLevelTwo = function _Forest_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Forest_generateWorldLevelThree = function _Forest_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Forest;
//# sourceMappingURL=Forest.js.map