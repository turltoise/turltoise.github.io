import AbstractBuff from "./AbstractBuff.js";

class AttackBuff extends AbstractBuff{
    getPhysicalDamage(): number {
        return this._target.getMagicDamage() * 50 / 100;
    }

    getMagicDamage(): number {
        return this._target.getMagicDamage() * 50 / 100;
    }
}
export default AttackBuff;