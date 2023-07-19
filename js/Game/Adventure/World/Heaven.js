var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Heaven_instances, _Heaven_generateWorldLevelOne, _Heaven_generateWorldLevelTwo, _Heaven_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Heaven extends AbstractWorld {
    constructor(title = "Title", background = "Background") {
        super(title, background);
        _Heaven_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Heaven_instances, "m", _Heaven_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Heaven_instances, "m", _Heaven_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Heaven_instances, "m", _Heaven_generateWorldLevelThree).call(this));
    }
}
_Heaven_instances = new WeakSet(), _Heaven_generateWorldLevelOne = function _Heaven_generateWorldLevelOne() {
    return new WorldLevel();
}, _Heaven_generateWorldLevelTwo = function _Heaven_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Heaven_generateWorldLevelThree = function _Heaven_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Heaven;
//# sourceMappingURL=Heaven.js.map