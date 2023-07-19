var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Desert_instances, _Desert_generateWorldLevelOne, _Desert_generateWorldLevelTwo, _Desert_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Desert extends AbstractWorld {
    constructor(title = "Title", background = "Background") {
        super(title, background);
        _Desert_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Desert_instances, "m", _Desert_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Desert_instances, "m", _Desert_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Desert_instances, "m", _Desert_generateWorldLevelThree).call(this));
    }
}
_Desert_instances = new WeakSet(), _Desert_generateWorldLevelOne = function _Desert_generateWorldLevelOne() {
    return new WorldLevel();
}, _Desert_generateWorldLevelTwo = function _Desert_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Desert_generateWorldLevelThree = function _Desert_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Desert;
//# sourceMappingURL=Desert.js.map