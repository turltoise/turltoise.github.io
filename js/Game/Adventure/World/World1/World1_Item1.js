import CardGraphicSetting from "../../../Card/CardGraphicSetting.js";
import Item from "../../../Card/Item.js";
import RawCarac from "../../../Card/RawCarac.js";
import PhysicalAttack from "../../../Fight/Capacity/List/PhysicalAttack.js";
import UUID from "../../../Tools/UUID.js";
class World1_Item1 extends Item {
    constructor(container, levelNumber) {
        let name = "World1_Item1";
        let backgroundImage = "item/World1_Item1.png";
        let carac = new RawCarac();
        carac._rawStrength = 3;
        carac._rawDexterity = 3;
        carac._rawPhysicalDamage = 3;
        carac._rawPhysicalCriticalRate = 3;
        carac._rawPhysicalCriticalNumber = 3;
        let capacities = new Map([
            [UUID.generateUUID(), new PhysicalAttack(container)]
        ]);
        let cardGraphicSetting = new CardGraphicSetting();
        cardGraphicSetting._maxSpriteDie1 = -1;
        cardGraphicSetting._maxSpriteStand = -1;
        cardGraphicSetting._maxSpriteHit1 = -1;
        cardGraphicSetting._maxSpriteAttack1 = -1;
        cardGraphicSetting._xSprite = "-36px";
        cardGraphicSetting._ySprite = "-40px";
        cardGraphicSetting._maxWidth = "70px";
        let uuid = UUID.generateUUID();
        super(container, carac, levelNumber, name, backgroundImage, capacities, cardGraphicSetting, uuid);
    }
}
export default World1_Item1;
//# sourceMappingURL=World1_Item1.js.map