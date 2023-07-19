import AbstractBuff from "./AbstractBuff.js";
class AttackBuff extends AbstractBuff {
    getPhysicalDamage(thrower) {
        return thrower.getMagicDamage() * 50 / 100;
    }
    getMagicDamage(thrower) {
        return thrower.getMagicDamage() * 50 / 100;
    }
}
export default AttackBuff;
//# sourceMappingURL=AttackBuff.js.map