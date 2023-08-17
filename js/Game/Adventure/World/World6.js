import World6_Hero1 from "../../Hero/World6_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
class World6 extends AbstractWorld {
    constructor(container, title = "Ocean", background = "Background") {
        super(container, title, background, 600000);
    }
    getHeroListByLevel(level) {
        let map = new Map();
        map.set(UUID.generateUUID(), new World6_Hero1(this._container, level));
        return map;
    }
}
export default World6;
//# sourceMappingURL=World6.js.map