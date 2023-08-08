import Container from "../../Container.js";
import AbstractWorld from "../Adventure/World/AbstractWorld.js";
import WorldList from "../Adventure/WorldList.js";

class Booster {
    private _container: Container;
    private _boosterInventory:  Map<string, number>;
    private _boosterAlreadyBought:  Map<string, number>;

    constructor(container: Container) {
        this._container = container;
        let worldList = this._container.get(WorldList.name);
        this._boosterInventory = new Map();
        this._boosterAlreadyBought = new Map();
        worldList.getList().forEach((world: AbstractWorld) => {
            this._boosterInventory.set(world.getName(), 0);
            this._boosterAlreadyBought.set(world.getName(), 0);
        });
    }

    getboosterAlreadyBoughtForWorld(world: AbstractWorld): number {return this._boosterAlreadyBought.get(world.getName());}

    buyBooster(world:AbstractWorld): void {
        this._boosterInventory.set(world.getName(), this._boosterInventory.get(world.getName()) + 1);
        this._boosterAlreadyBought.set(world.getName(), this._boosterAlreadyBought.get(world.getName()) + 1);
    }

    getNumberBoosterOwnedForWorld(world: AbstractWorld): number {
        return this._boosterInventory.get(world.getName());
    }

    decrementNumberBoosterOwnedForWorld(world: AbstractWorld) {
        let n: number = this._boosterInventory.get(world.getName());
        n-=1;
        this._boosterInventory.set(world.getName(), n);
    }

    getTotalNumberBoosterOwned(): number {
        let count: number = 0;
        this._boosterInventory.forEach((total, worldName) => {
           count+=total; 
        });
        return count;
    }
}
export default Booster;