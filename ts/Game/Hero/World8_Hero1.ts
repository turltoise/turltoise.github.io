import Container from "../../Container.js";
import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";

class World8_Hero1 extends Hero {
    constructor(container: Container, levelNumber:number) {
        let name = "Cayne";
        let backgroundImage = "hero/Cayne";

        let carac = new RawCarac();
        carac._rawStrength = 20;
        carac._rawDexterity = 10;
        carac._rawIntelligence = 0;
        carac._rawLuck = 0;

        carac._rawPhysicalDamage = 50;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;

        carac._rawMagicDamage = 3;
        carac._rawMagicCriticalRate = 3;
        carac._rawMagicCriticalNumber = 3;

        carac._rawFireResistance = 0;
        carac._rawWaterResistance = 0;
        carac._rawPlantResistance = 0;
        carac._rawNecromancyResistance = 0;
        carac._rawBlessingResistance = 0;
        carac._rawArmor = 20;

        carac._rawAccuracy = 8;
        carac._rawEscape = 8;

        carac._rawLife = 50;

        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);

        let cardGraphicSetting  = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1  = 11;
        cardGraphicSetting._maxSpriteStand = 3;
        cardGraphicSetting._maxSpriteHit1  = -1;
        cardGraphicSetting._maxSpriteAttack1 = 10;
        cardGraphicSetting._xSprite = "-30px";
        cardGraphicSetting._ySprite = "-20px";

        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World8_Hero1;