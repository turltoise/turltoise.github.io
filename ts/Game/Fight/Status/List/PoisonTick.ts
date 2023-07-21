import CapacityProcessor from "../../Capacity/CapacityProcessor.js";
import Capacity from "../../Capacity/CapacityProcessor.js";
import Element from "../../Element.js";
import AbstractTick from "./AbstractTick.js";

class PoisonTick extends AbstractTick{
    tick() {
        CapacityProcessor.magicProc(this._state, "poison", this._thrower, this._target, 30, Element.PLANT())
    }
}
export default PoisonTick;