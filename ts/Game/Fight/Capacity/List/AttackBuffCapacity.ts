import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import AttackBuff from "../../Status/List/AttackBuff.js";
import Status from "../../Status/Status.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class AttackBuffCapacity extends AbstractCapacity {
    constructor(container: Container) {
        super(container, 'Attack buff');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
        const status = new Status(this.getName(), 5, new AttackBuff(this._container, thrower, target), null);
        CapacityProcessor.putStatus(this._container, this.getName(), thrower, target, status);
    }
}
export default AttackBuffCapacity;