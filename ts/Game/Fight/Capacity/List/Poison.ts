import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js"
import PoisonTick from "../../Status/List/PoisonTick.js";
import Status from "../../Status/Status.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Poison extends AbstractCapacity {
    constructor(container: Container) {
        super(container, 'Poison');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
        const status = new Status(this.getName(), 3, null, new PoisonTick(this._container, thrower, target)); 
        this.putStatus(this.getName(), thrower, target, status);
    }
}
export default Poison;