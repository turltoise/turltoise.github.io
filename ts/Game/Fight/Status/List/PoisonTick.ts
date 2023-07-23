import Element from "../../Element.js";
import AbstractTick from "./AbstractTick.js";

class PoisonTick extends AbstractTick{
    tick() {
        this.magicProc("poison", this._thrower, this._target, 30, Element.PLANT())
    }
}
export default PoisonTick;