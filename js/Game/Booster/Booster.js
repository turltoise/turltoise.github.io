import WorldList from "../Adventure/WorldList.js";
class Booster {
    constructor(container) {
        this._container = container;
        let worldList = this._container.get(WorldList.name);
        this._bootserInventory = new Map();
        this._bootserAlreadyBought = new Map();
        worldList.getList().forEach((world) => {
            this._bootserInventory.set(world.getName(), 0);
            this._bootserAlreadyBought.set(world.getName(), 0);
        });
    }
    buyBooster(world) {
        this._bootserInventory.set(world.getName(), this._bootserInventory.get(world.getName()) + 1);
        this._bootserAlreadyBought.set(world.getName(), this._bootserAlreadyBought.get(world.getName()) + 1);
    }
    getNumberBoosterOwnedForWorld(world) {
        return this._bootserInventory.get(world.getName());
    }
    getTotalNumberBoosterOwned() {
        let count = 0;
        this._bootserInventory.forEach((total, worldName) => {
            count += total;
        });
        return count;
    }
}
export default Booster;
//# sourceMappingURL=Booster.js.map