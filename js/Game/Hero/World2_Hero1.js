import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";
class World2_Hero1 extends Hero {
    constructor(container, levelNumber) {
        let name = "Simon";
        let backgroundImage = "hero/Simon";
        let carac = new RawCarac();
        carac._rawStrength = 5;
        carac._rawDexterity = 8;
        carac._rawIntelligence = 5;
        carac._rawLuck = 5;
        carac._rawPhysicalDamage = 10;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;
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
        carac._rawLife = 30;
        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);
        let cardGraphicSetting = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1 = 14;
        cardGraphicSetting._maxSpriteStand = 3;
        cardGraphicSetting._maxSpriteHit1 = 0;
        cardGraphicSetting._maxSpriteAttack1 = 12;
        cardGraphicSetting._xSprite = "-25px";
        cardGraphicSetting._ySprite = "-24px";
        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World2_Hero1;
//# sourceMappingURL=World2_Hero1.js.map