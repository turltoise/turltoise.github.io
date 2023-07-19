var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cave_instances, _Cave_generateWorldLevelOne, _Cave_generateWorldLevelTwo, _Cave_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Cave extends AbstractWorld {
    constructor(title = "Title", background = "Background") {
        super(title, background);
        _Cave_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Cave_instances, "m", _Cave_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Cave_instances, "m", _Cave_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Cave_instances, "m", _Cave_generateWorldLevelThree).call(this));
    }
}
_Cave_instances = new WeakSet(), _Cave_generateWorldLevelOne = function _Cave_generateWorldLevelOne() {
    return new WorldLevel();
}, _Cave_generateWorldLevelTwo = function _Cave_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Cave_generateWorldLevelThree = function _Cave_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Cave;
//# sourceMappingURL=Cave.js.map