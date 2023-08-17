import Container from "../../Container.js";
import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";

class World7_Hero1 extends Hero {
    constructor(container: Container, levelNumber:number) {
        let name = "Illusion Soldier A";
        let backgroundImage = "hero/Illusion Soldier A";

        let carac = new RawCarac();
        carac._rawStrength = 10;
        carac._rawDexterity = 12;
        carac._rawIntelligence = 8;
        carac._rawLuck = 6;

        carac._rawPhysicalDamage = 15;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;

        carac._rawMagicDamage = 15;
        carac._rawMagicCriticalRate = 0;
        carac._rawMagicCriticalNumber = 0;

        carac._rawFireResistance = 0;
        carac._rawWaterResistance = 0;
        carac._rawPlantResistance = 0;
        carac._rawNecromancyResistance = 0;
        carac._rawBlessingResistance = 0;
        carac._rawArmor = 8;

        carac._rawAccuracy = 10;
        carac._rawEscape = 10;

        carac._rawLife = 40;

        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);

        let cardGraphicSetting  = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1  = 9;
        cardGraphicSetting._maxSpriteStand = 5;
        cardGraphicSetting._maxSpriteHit1  = 0;
        cardGraphicSetting._maxSpriteAttack1 = 10;
        cardGraphicSetting._xSprite = "-25px";
        cardGraphicSetting._ySprite = "-25px";

        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World7_Hero1;