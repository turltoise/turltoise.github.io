import Container from "../../Container.js";
import CardGraphicSetting from "../Card/CardGraphicSetting.js";
import Hero from "../Card/Hero.js";
import RawCarac from "../Card/RawCarac.js";
import FireBall from "../Fight/Capacity/List/FireBall.js";
import UUID from "../Tools/UUID.js";

class World3_Hero1 extends Hero {
    constructor(container: Container, levelNumber:number) {
        let name = "Dances with Balrog's Clone";
        let backgroundImage = "hero/Dances with Balrog's Clone";

        let carac = new RawCarac();
        carac._rawStrength = 5;
        carac._rawDexterity = 5;
        carac._rawIntelligence = 12;
        carac._rawLuck = 8;

        carac._rawPhysicalDamage = 0;
        carac._rawPhysicalCriticalRate = 0;
        carac._rawPhysicalCriticalNumber = 0;

        carac._rawMagicDamage = 20;
        carac._rawMagicCriticalRate = 10;
        carac._rawMagicCriticalNumber = 15;

        carac._rawFireResistance = 20;
        carac._rawWaterResistance = 0;
        carac._rawPlantResistance = 40;
        carac._rawNecromancyResistance = 0;
        carac._rawBlessingResistance = 0;
        carac._rawArmor = 0;

        carac._rawAccuracy = 2;
        carac._rawEscape = 2;

        carac._rawLife = 20;

        let capacities = new Map([
            [UUID.generateUUID(), new FireBall(container)]
        ]);

        let cardGraphicSetting  = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1  = 14;
        cardGraphicSetting._maxSpriteStand = 2;
        cardGraphicSetting._maxSpriteHit1  = -1;
        cardGraphicSetting._maxSpriteAttack1 = 2;
        cardGraphicSetting._xSprite = "-30px";
        cardGraphicSetting._ySprite = "-25px";

        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting);
    }
}
export default World3_Hero1;