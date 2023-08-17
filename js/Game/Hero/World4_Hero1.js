import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";
class World4_Hero1 extends Hero {
    constructor(container, levelNumber) {
        let name = "Cygnus Centurion";
        let backgroundImage = "hero/Cygnus Centurion";
        let carac = new RawCarac();
        carac._rawStrength = 1;
        carac._rawDexterity = 20;
        carac._rawIntelligence = 0;
        carac._rawLuck = 0;
        carac._rawPhysicalDamage = 0;
        carac._rawPhysicalCriticalRate = 50;
        carac._rawPhysicalCriticalNumber = 50;
        carac._rawMagicDamage = 0;
        carac._rawMagicCriticalRate = 0;
        carac._rawMagicCriticalNumber = 0;
        carac._rawFireResistance = 0;
        carac._rawWaterResistance = 0;
        carac._rawPlantResistance = 0;
        carac._rawNecromancyResistance = 0;
        carac._rawBlessingResistance = 0;
        carac._rawArmor = 0;
        carac._rawAccuracy = 2;
        carac._rawEscape = 2;
        carac._rawLife = 25;
        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);
        let cardGraphicSetting = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1 = 10;
        cardGraphicSetting._maxSpriteStand = 5;
        cardGraphicSetting._maxSpriteHit1 = -1;
        cardGraphicSetting._maxSpriteAttack1 = 8;
        cardGraphicSetting._xSprite = "-35px";
        cardGraphicSetting._ySprite = "-22px";
        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World4_Hero1;
//# sourceMappingURL=World4_Hero1.js.map