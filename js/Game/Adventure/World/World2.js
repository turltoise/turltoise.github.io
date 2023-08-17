import World2_Hero1 from "../../Hero/World2_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
class World2 extends AbstractWorld {
    constructor(container, title = "Forest", background = "Background") {
        super(container, title, background, 75);
    }
    getHeroListByLevel(level) {
        let map = new Map();
        map.set(UUID.generateUUID(), new World2_Hero1(this._container, level));
        return map;
    }
}
export default World2;
//# sourceMappingURL=World2.js.map