var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Hell_instances, _Hell_generateWorldLevelOne, _Hell_generateWorldLevelTwo, _Hell_generateWorldLevelThree;
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";
class Hell extends AbstractWorld {
    constructor(container, title = "Title", background = "Background") {
        super(container, title, background, 15000000);
        _Hell_instances.add(this);
        this.addWorldLevel(__classPrivateFieldGet(this, _Hell_instances, "m", _Hell_generateWorldLevelOne).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Hell_instances, "m", _Hell_generateWorldLevelTwo).call(this));
        this.addWorldLevel(__classPrivateFieldGet(this, _Hell_instances, "m", _Hell_generateWorldLevelThree).call(this));
    }
}
_Hell_instances = new WeakSet(), _Hell_generateWorldLevelOne = function _Hell_generateWorldLevelOne() {
    return new WorldLevel();
}, _Hell_generateWorldLevelTwo = function _Hell_generateWorldLevelTwo() {
    return new WorldLevel();
}, _Hell_generateWorldLevelThree = function _Hell_generateWorldLevelThree() {
    return new WorldLevel();
};
export default Hell;
//# sourceMappingURL=Hell.js.map