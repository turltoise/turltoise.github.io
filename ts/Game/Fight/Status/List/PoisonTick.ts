import Capacity from "../../Capacity/Capacity.js";
import Element from "../../Element.js";
import AbstractTick from "./AbstractTick.js";

class PoisonTick extends AbstractTick{
    tick() {
        Capacity.magicProc(this._state, "poison", this._thrower, this._target, 30, Element.PLANT())
    }
}
export default PoisonTick;