import World8_Hero1 from "../../Hero/World8_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
class World8 extends AbstractWorld {
    constructor(container, title = "Hell", background = "Background") {
        super(container, title, background, 15000000);
    }
    getHeroListByLevel(level) {
        let map = new Map();
        map.set(UUID.generateUUID(), new World8_Hero1(this._container, level));
        return map;
    }
}
export default World8;
//# sourceMappingURL=World8.js.map