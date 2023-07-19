var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ocean_instances, _Ocean_generateWorldLevelOne, _Ocean_generateWorldLevelTwo, _Ocean_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Ocean extends AbstractWorld {
    constructor(title = "Title", background = "Background") {
        super(title, background);
        _Ocean_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Ocean_instances, "m", _Ocean_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Ocean_instances, "m", _Ocean_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Ocean_instances, "m", _Ocean_generateWorldLevelThree).call(this));
    }
}
_Ocean_instances = new WeakSet(), _Ocean_generateWorldLevelOne = function _Ocean_generateWorldLevelOne() {
    return new WorldLevel();
}, _Ocean_generateWorldLevelTwo = function _Ocean_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Ocean_generateWorldLevelThree = function _Ocean_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Ocean;
//# sourceMappingURL=Ocean.js.map