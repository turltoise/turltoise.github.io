import Container from "../../Container.js";
import AbstractWorld from "../Adventure/World/AbstractWorld.js";
import WorldList from "../Adventure/WorldList.js";

class Booster {
    private _container: Container;
    private _bootserInventory:  Map<string, number>;
    private _bootserAlreadyBought:  Map<string, number>;

    constructor(container: Container) {
        this._container = container;
        let worldList = this._container.get(WorldList.name);
        this._bootserInventory = new Map();
        this._bootserAlreadyBought = new Map();
        worldList.getList().forEach((world: AbstractWorld) => {
            this._bootserInventory.set(world.getName(), 0);
            this._bootserAlreadyBought.set(world.getName(), 0);
        });
    }

    buyBooster(world:AbstractWorld): void {
        this._bootserInventory.set(world.getName(), this._bootserInventory.get(world.getName()) + 1);
        this._bootserAlreadyBought.set(world.getName(), this._bootserAlreadyBought.get(world.getName()) + 1);
    }

    getNumberBoosterOwnedForWorld(world: AbstractWorld): number {
        return this._bootserInventory.get(world.getName());
    }

    getTotalNumberBoosterOwned(): number {
        let count: number = 0;
        this._bootserInventory.forEach((total, worldName) => {
           count+=total; 
        });
        return count;
    }
}
export default Booster;