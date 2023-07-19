import Beach from "./World/Beach.js";
import Cave from "./World/Cave.js";
import Desert from "./World/Desert.js";
import Forest from "./World/Forest.js";
import Heaven from "./World/Heaven.js";
import Hell from "./World/Hell.js";
import Meadow from "./World/Meadow.js";
import Mountain from "./World/Mountain.js";
import Ocean from "./World/Ocean.js";
class WorldList {
    constructor() {
        this._list = new Map();
        this._list.set(1, new Meadow());
        this._list.set(2, new Forest());
        this._list.set(3, new Desert());
        this._list.set(4, new Mountain());
        this._list.set(5, new Beach());
        this._list.set(6, new Ocean());
        this._list.set(7, new Cave());
        this._list.set(8, new Hell());
        this._list.set(9, new Heaven());
    }
    getList() {
        return this._list;
    }
    // static call # TODO rework
    static getListName() {
        const levelList = new Map();
        levelList.set(1, "Meadow");
        levelList.set(2, "Forest");
        levelList.set(3, "Desert");
        levelList.set(4, "Mountain");
        levelList.set(5, "Beach");
        levelList.set(6, "Ocean");
        levelList.set(7, "Cave");
        levelList.set(8, "Hell");
        levelList.set(9, "Heaven");
        return levelList;
    }
}
export default WorldList;
//# sourceMappingURL=WorldList.js.map