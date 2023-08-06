import World1_Hero1 from "../../Hero/World1_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
import World1_Enemy1 from "./World1/World1_Enemy1.js";
import World1_Item1 from "./World1/World1_Item1.js";
class World1 extends AbstractWorld {
    constructor(container, title = "Meadow", background) {
        super(container, title, background, 4);
        this._itemClassList.set(UUID.generateUUID(), World1_Item1.name);
    }
    getEnemy1(numberLevel) {
        return new World1_Enemy1(this._container, numberLevel);
    }
    /*getCardAvailable(): Map <string, string> {
        let map = new Map();
        map.set(UUID.generateUUID(), World1_Hero1.name);
        return
    }*/
    getHeroList() {
        let map = new Map();
        map.set(UUID.generateUUID(), World1_Hero1);
        return map;
    }
    getItemList() {
        let map = new Map();
        map.set(UUID.generateUUID(), World1_Item1);
        return map;
    }
}
export default World1;
//# sourceMappingURL=World1.js.map