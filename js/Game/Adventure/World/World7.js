import World7_Hero1 from "../../Hero/World7_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
class World7 extends AbstractWorld {
    constructor(container, title = "Cave", background = "Background") {
        super(container, title, background, 1800000);
    }
    getHeroListByLevel(level) {
        let map = new Map();
        map.set(UUID.generateUUID(), new World7_Hero1(this._container, level));
        return map;
    }
}
export default World7;
//# sourceMappingURL=World7.js.map