import Container from "../../../../Container.js";
import CardGraphicSetting from "../../../Card/CardGraphicSetting.js";
import Enemy from "../../../Card/Enemy.js";
import RawCarac from "../../../Card/RawCarac.js";
import PhysicalAttack from "../../../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../../../Tools/UUID.js";

class World1_Enemy1 extends Enemy {
    constructor(container: Container, levelNumber:number) {
        let name = "World1_Enemy1";
        let backgroundImage = "enemy/Pig";
        let gold = 5;

        let carac = new RawCarac();
        carac._rawStrength = 3;
        carac._rawDexterity = 3;
        carac._rawIntelligence = 3;
        carac._rawLuck = 3;

        carac._rawPhysicalDamage = 3;
        carac._rawPhysicalCriticalRate = 3;
        carac._rawPhysicalCriticalNumber = 3;

        carac._rawMagicDamage = 3;
        carac._rawMagicCriticalRate = 3;
        carac._rawMagicCriticalNumber = 3;

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

        let cardGraphicSetting  = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1 = 2;
        cardGraphicSetting._maxSpriteStand = 2;
        cardGraphicSetting._maxSpriteHit1 = 0;
        cardGraphicSetting._maxSpriteAttack1 = -1;

        super(container, carac, levelNumber, name, backgroundImage, gold, capacities, cardGraphicSetting);
    }
}
export default World1_Enemy1;