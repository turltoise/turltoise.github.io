import Container from "../../Container.js";
import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";

class World5_Hero1 extends Hero {
    constructor(container: Container, levelNumber:number) {
        let name = "Hazard's Rotten Crony";
        let backgroundImage = "hero/Hazard's Rotten Crony";

        let carac = new RawCarac();
        carac._rawStrength = 8;
        carac._rawDexterity = 8;
        carac._rawIntelligence = 8;
        carac._rawLuck = 8;

        carac._rawPhysicalDamage = 20;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;

        carac._rawMagicDamage = 20;
        carac._rawMagicCriticalRate = 0;
        carac._rawMagicCriticalNumber = 0;

        carac._rawFireResistance = 10;
        carac._rawWaterResistance = 10;
        carac._rawPlantResistance = 10;
        carac._rawNecromancyResistance = 10;
        carac._rawBlessingResistance = 10;
        carac._rawArmor = 10;

        carac._rawAccuracy = 2;
        carac._rawEscape = 2;

        carac._rawLife = 30;

        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);

        let cardGraphicSetting  = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1  = 11;
        cardGraphicSetting._maxSpriteStand = 5;
        cardGraphicSetting._maxSpriteHit1  = 0;
        cardGraphicSetting._maxSpriteAttack1 = 8;
        cardGraphicSetting._xSprite = "-40px";
        cardGraphicSetting._ySprite = "-10px";

        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World5_Hero1;