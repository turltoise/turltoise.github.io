import WorldList from "../Adventure/WorldList.js";
class Booster {
    constructor(container) {
        this._container = container;
        let worldList = this._container.get(WorldList.name);
        this._boosterInventory = new Map();
        this._boosterAlreadyBought = new Map();
        worldList.getList().forEach((world) => {
            this._boosterInventory.set(world.getName(), 0);
            this._boosterAlreadyBought.set(world.getName(), 0);
        });
    }
    getboosterAlreadyBoughtForWorld(world) { return this._boosterAlreadyBought.get(world.getName()); }
    buyBooster(world) {
        this._boosterInventory.set(world.getName(), this._boosterInventory.get(world.getName()) + 1);
        this._boosterAlreadyBought.set(world.getName(), this._boosterAlreadyBought.get(world.getName()) + 1);
    }
    getNumberBoosterOwnedForWorld(world) {
        return this._boosterInventory.get(world.getName());
    }
    decrementNumberBoosterOwnedForWorld(world) {
        let n = this._boosterInventory.get(world.getName());
        n -= 1;
        this._boosterInventory.set(world.getName(), n);
    }
    getTotalNumberBoosterOwned() {
        let count = 0;
        this._boosterInventory.forEach((total, worldName) => {
            count += total;
        });
        return count;
    }
}
export default Booster;
//# sourceMappingURL=Booster.js.map