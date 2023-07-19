import AbstractBuff from "./AbstractBuff.js";
class AttackBuff extends AbstractBuff {
    getPhysicalDamage() {
        return this._target.getMagicDamage() * 50 / 100;
    }
    getMagicDamage() {
        return this._target.getMagicDamage() * 50 / 100;
    }
}
export default AttackBuff;
//# sourceMappingURL=AttackBuff.js.map