var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mountain_instances, _Mountain_generateWorldLevelOne, _Mountain_generateWorldLevelTwo, _Mountain_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Mountain extends AbstractWorld {
    constructor(state, title = "Title", background = "Background") {
        super(state, title, background);
        _Mountain_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Mountain_instances, "m", _Mountain_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Mountain_instances, "m", _Mountain_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Mountain_instances, "m", _Mountain_generateWorldLevelThree).call(this));
    }
}
_Mountain_instances = new WeakSet(), _Mountain_generateWorldLevelOne = function _Mountain_generateWorldLevelOne() {
    return new WorldLevel();
}, _Mountain_generateWorldLevelTwo = function _Mountain_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Mountain_generateWorldLevelThree = function _Mountain_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Mountain;
//# sourceMappingURL=Mountain.js.map