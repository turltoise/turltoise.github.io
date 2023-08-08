var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ItemRarity_instances, _ItemRarity_generateColor, _ItemRarity_generateName, _ItemRarity_computeRate;
class ItemRarity {
    constructor() {
        _ItemRarity_instances.add(this);
        this._colorList = new Map();
        __classPrivateFieldGet(this, _ItemRarity_instances, "m", _ItemRarity_generateColor).call(this);
        this._nameList = new Map();
        __classPrivateFieldGet(this, _ItemRarity_instances, "m", _ItemRarity_generateName).call(this);
    }
    getName(id) {
        return this._nameList.get(id);
    }
    getColor(id) {
        return this._colorList.get(id);
    }
    rollRarity() {
        let roll = Math.floor(Math.random() * 100) + 1;
        return __classPrivateFieldGet(this, _ItemRarity_instances, "m", _ItemRarity_computeRate).call(this, roll);
    }
    static POOR() { return 'poor'; }
    static COMMON() { return 'common'; }
    static UNCOMMON() { return 'uncommon'; }
    static RARE() { return 'rare'; }
    static EPIC() { return 'epic'; }
    static LEGENDARY() { return 'legendary'; }
    static ARTIFACT() { return 'artifact'; }
}
_ItemRarity_instances = new WeakSet(), _ItemRarity_generateColor = function _ItemRarity_generateColor() {
    this._colorList.set(ItemRarity.POOR(), '#9d9d9d');
    this._colorList.set(ItemRarity.COMMON(), 'white');
    this._colorList.set(ItemRarity.UNCOMMON(), '#1eff00');
    this._colorList.set(ItemRarity.RARE(), '#0cf'); //'#0070dd');
    this._colorList.set(ItemRarity.EPIC(), '#a335ee');
    this._colorList.set(ItemRarity.LEGENDARY(), '#ff8000');
    this._colorList.set(ItemRarity.ARTIFACT(), '#e5cc80');
}, _ItemRarity_generateName = function _ItemRarity_generateName() {
    this._nameList.set(ItemRarity.POOR(), 'Poor');
    this._nameList.set(ItemRarity.COMMON(), 'Common');
    this._nameList.set(ItemRarity.UNCOMMON(), 'Uncommon');
    this._nameList.set(ItemRarity.RARE(), 'Rare');
    this._nameList.set(ItemRarity.EPIC(), 'Epic');
    this._nameList.set(ItemRarity.LEGENDARY(), 'Legendary');
    this._nameList.set(ItemRarity.ARTIFACT(), 'Artifact');
}, _ItemRarity_computeRate = function _ItemRarity_computeRate(roll) {
    switch (true) {
        case (roll == 1):
            return ItemRarity.ARTIFACT();
        case (roll < 6):
            return ItemRarity.LEGENDARY();
        case (roll < 15):
            return ItemRarity.EPIC();
        case (roll < 31):
            return ItemRarity.RARE();
        case (roll < 51):
            return ItemRarity.UNCOMMON();
        case (roll < 91):
            return ItemRarity.COMMON();
        default:
            return ItemRarity.POOR();
    }
};
export default ItemRarity;
//# sourceMappingURL=ItemRarity.js.map