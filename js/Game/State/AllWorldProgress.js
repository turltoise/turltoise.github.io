var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AllWorldProgress_instances, _AllWorldProgress_generateProgressForAllWorld, _AllWorldProgress_createProgressForCurrentWorld, _AllWorldProgress_exists;
import World from "../Adventure/WorldList.js";
class AllWorldProgress {
    constructor() {
        _AllWorldProgress_instances.add(this);
        this._progressPerWorld = new Map();
        __classPrivateFieldGet(this, _AllWorldProgress_instances, "m", _AllWorldProgress_generateProgressForAllWorld).call(this);
    }
    getCurrentLevelForWorld(worldName) {
        return __classPrivateFieldGet(this, _AllWorldProgress_instances, "m", _AllWorldProgress_exists).call(this, worldName) ? this._progressPerWorld.get(worldName).currentLevel : 0;
    }
    getMaxLevelReachForWorld(worldName) {
        return __classPrivateFieldGet(this, _AllWorldProgress_instances, "m", _AllWorldProgress_exists).call(this, worldName) ? this._progressPerWorld.get(worldName).maxLevelReach : 0;
    }
    incrementCurrentLevelForWorld(worldName) {
        let currentWorldProgress = this._progressPerWorld.get(worldName);
        currentWorldProgress.currentLevel = currentWorldProgress.currentLevel + 1;
        this._progressPerWorld.set(worldName, currentWorldProgress);
    }
    reduceCurrentLevelForWorld(worldName) {
        let currentWorldProgress = this._progressPerWorld.get(worldName);
        currentWorldProgress.currentLevel = currentWorldProgress.currentLevel - 1;
        this._progressPerWorld.set(worldName, currentWorldProgress);
    }
    setMaxLevelReachForWorld(worldName, maxLevelToSet) {
        let currentWorldProgress = this._progressPerWorld.get(worldName);
        currentWorldProgress.maxLevelReach = maxLevelToSet;
        this._progressPerWorld.set(worldName, currentWorldProgress);
    }
}
_AllWorldProgress_instances = new WeakSet(), _AllWorldProgress_generateProgressForAllWorld = function _AllWorldProgress_generateProgressForAllWorld() {
    const self = this;
    World.getListName().forEach(function (className, id) {
        self._progressPerWorld.set(className, __classPrivateFieldGet(self, _AllWorldProgress_instances, "m", _AllWorldProgress_createProgressForCurrentWorld).call(self));
    });
}, _AllWorldProgress_createProgressForCurrentWorld = function _AllWorldProgress_createProgressForCurrentWorld() {
    return { "currentLevel": 1, "maxLevelReach": 0 };
}, _AllWorldProgress_exists = function _AllWorldProgress_exists(worldName) {
    return this._progressPerWorld.has(worldName);
};
export default AllWorldProgress;
//# sourceMappingURL=AllWorldProgress.js.map