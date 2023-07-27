import AbstractWorld from "./AbstractWorld.js";
import World1_Enemy1 from "./World1/World1_Enemy1.js";
class World1 extends AbstractWorld {
    constructor(container, title = "Meadow", background) {
        super(container, title, background, 4);
    }
    getEnemy1(numberLevel) {
        return new World1_Enemy1(this._container, numberLevel);
    }
}
export default World1;
//# sourceMappingURL=World1.js.map