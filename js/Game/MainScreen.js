class MainScreen {
    constructor(combatPanel, collectionPanel, openingPanel, shopPanel) {
        this._labelCombat = 'combat';
        this._labelCollection = 'collection';
        this._labelOpening = 'opening';
        this._labelShop = 'shop';
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