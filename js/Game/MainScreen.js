import CollectionPanelGraphicComponent from "../Component/Panel/CollectionPanelGraphicComponent.js";
import CombatPanelGraphicComponent from "../Component/Panel/CombatPanelGraphicComponent.js";
import OpeningPanelGraphicComponent from "../Component/Panel/OpeningPanelGraphicComponent.js";
import ShopPanelGraphicComponent from "../Component/Panel/ShopPanelGraphicComponent.js";
class MainScreen {
    constructor(container) {
        this._container = container;
        const combatPanel = this._container.get(CombatPanelGraphicComponent.name);
        const collectionPanel = this._container.get(CollectionPanelGraphicComponent.name);
        const openingPanel = this._container.get(OpeningPanelGraphicComponent.name);
        const shopPanel = this._container.get(ShopPanelGraphicComponent.name);
        this._labelCombat = 'combat-label';
        this._labelCollection = 'collection-label';
        this._labelOpening = 'opening-label';
        this._labelShop = 'shop-label';
        this._panelList = {};
        this._panelList[this._labelCombat] = combatPanel;
        this._panelList[this._labelCollection] = collectionPanel;
        this._panelList[this._labelOpening] = openingPanel;
        this._panelList[this._labelShop] = shopPanel;
        // by default combat panel
        this._currentPanel = this._labelCombat;
    }
    setCurrentPanel(currentPanel) {
        this._currentPanel = currentPanel;
    }
    getCurrentPanel() {
        return this._currentPanel;
    }
    getPanelList() { return this._panelList; }
    getLabelCombat() { return this._labelCombat; }
    getLabelCollection() { return this._labelCollection; }
    getLabelOpening() { return this._labelOpening; }
    getLabelShop() { return this._labelShop; }
}
export default MainScreen;
//# sourceMappingURL=MainScreen.js.map