import World5_Hero1 from "../../Hero/World5_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
class World5 extends AbstractWorld {
    constructor(container, title = "Beach", background = "Background") {
        super(container, title, background, 40000);
    }
    getHeroListByLevel(level) {
        let map = new Map();
        map.set(UUID.generateUUID(), new World5_Hero1(this._container, level));
        return map;
    }
}
export default World5;
//# sourceMappingURL=World5.js.map