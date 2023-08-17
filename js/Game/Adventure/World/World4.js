import World4_Hero1 from "../../Hero/World4_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
class World4 extends AbstractWorld {
    constructor(container, title = "Mountain", background = "Background") {
        super(container, title, background, 3000);
    }
    getHeroListByLevel(level) {
        let map = new Map();
        map.set(UUID.generateUUID(), new World4_Hero1(this._container, level));
        return map;
    }
}
export default World4;
//# sourceMappingURL=World4.js.map