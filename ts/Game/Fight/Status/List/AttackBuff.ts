import AbstractBuff from "./AbstractBuff.js";

class AttackBuff extends AbstractBuff{
    getPhysicalDamage (thrower): number {
        return thrower.getMagicDamage() * 50 / 100;
    }

    getMagicDamage(thrower): number {
        return thrower.getMagicDamage() * 50 / 100;
    }
}
export default AttackBuff;