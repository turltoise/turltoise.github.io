import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";
class World6_Hero1 extends Hero {
    constructor(container, levelNumber) {
        let name = "Count's Swordsman";
        let backgroundImage = "hero/Count's Swordsman";
        let carac = new RawCarac();
        carac._rawStrength = 15;
        carac._rawDexterity = 15;
        carac._rawIntelligence = 3;
        carac._rawLuck = 3;
        carac._rawPhysicalDamage = 10;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;
        carac._rawMagicDamage = 0;
        carac._rawMagicCriticalRate = 0;
        carac._rawMagicCriticalNumber = 0;
        carac._rawFireResistance = 20;
        carac._rawWaterResistance = 20;
        carac._rawPlantResistance = 20;
        carac._rawNecromancyResistance = 20;
        carac._rawBlessingResistance = 20;
        carac._rawArmor = 30;
        carac._rawAccuracy = 2;
        carac._rawEscape = 2;
        carac._rawLife = 60;
        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);
        let cardGraphicSetting = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1 = 17;
        cardGraphicSetting._maxSpriteStand = 5;
        cardGraphicSetting._maxSpriteHit1 = 0;
        cardGraphicSetting._maxSpriteAttack1 = 12;
        cardGraphicSetting._xSprite = "-30px";
        cardGraphicSetting._ySprite = "-15px";
        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World6_Hero1;
//# sourceMappingURL=World6_Hero1.js.map