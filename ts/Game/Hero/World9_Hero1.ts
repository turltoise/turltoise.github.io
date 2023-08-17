import Container from "../../Container.js";
import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import FireBall from "../Fight/Capacity/List/FireBall.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../Tools/UUID.js";

class World9_Hero1 extends Hero {
    constructor(container: Container, levelNumber:number) {
        let name = "Albaire";
        let backgroundImage = "hero/Albaire";

        let carac = new RawCarac();
        carac._rawStrength = 5;
        carac._rawDexterity = 5;
        carac._rawIntelligence = 20;
        carac._rawLuck = 15;

        carac._rawPhysicalDamage = 0;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;

        carac._rawMagicDamage = 20;
        carac._rawMagicCriticalRate = 20;
        carac._rawMagicCriticalNumber = 20;

        carac._rawFireResistance = 5;
        carac._rawWaterResistance = 5;
        carac._rawPlantResistance = 5;
        carac._rawNecromancyResistance = 5;
        carac._rawBlessingResistance = 5;
        carac._rawArmor = 5;

        carac._rawAccuracy = 10;
        carac._rawEscape = 10;

        carac._rawLife = 40;

        let capacities = new Map([
            [UUID.generateUUID(), new FireBall(container)]
        ]);

        let cardGraphicSetting  = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1  = 0;
        cardGraphicSetting._maxSpriteStand = 0;
        cardGraphicSetting._maxSpriteHit1  = 14;
        cardGraphicSetting._maxSpriteAttack1 = 23;
        cardGraphicSetting._xSprite = "-30px";
        cardGraphicSetting._ySprite = "-20px";

        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World9_Hero1;