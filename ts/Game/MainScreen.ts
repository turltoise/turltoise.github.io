import CollectionPanelGraphicComponent from "../Component/Panel/CollectionPanelGraphicComponent.js";
import CombatPanelGraphicComponent from "../Component/Panel/CombatPanelGraphicComponent.js";
import OpeningPanelGraphicComponent from "../Component/Panel/OpeningPanelGraphicComponent.js";
import ShopPanelGraphicComponent from "../Component/Panel/ShopPanelGraphicComponent.js";

class MainScreen {
	private _labelCombat: string;
	private _labelCollection: string;
	private _labelOpening: string;
	private _labelShop: string;
	private _panelList: {};
	private _currentPanel: string;

	constructor(
		combatPanel: CombatPanelGraphicComponent,
		collectionPanel: CollectionPanelGraphicComponent,
		openingPanel: OpeningPanelGraphicComponent,
		shopPanel: ShopPanelGraphicComponent
	) {
		this._labelCombat 		= 'combat';
		this._labelCollection 	= 'collection';
		this._labelOpening 		= 'opening';
		this._labelShop 		= 'shop';

		this._panelList = {};
		this._panelList[this._labelCombat] 		= combatPanel;
		this._panelList[this._labelCollection] 	= collectionPanel;
		this._panelList[this._labelOpening] 	= openingPanel;
		this._panelList[this._labelShop]		= shopPanel;
		// by default combat panel
		this._currentPanel = this._labelCombat;
	}

	setCurrentPanel(currentPanel: string) {
		this._currentPanel = currentPanel;
	}

	getCurrentPanel(): string {
		return this._currentPanel;
	}

	getPanelList(): {} {return this._panelList;}

	getLabelCombat(): string {return this._labelCombat;}
	getLabelCollection(): string {return this._labelCollection;}
	getLabelOpening(): string {return this._labelOpening;}
	getLabelShop(): string {return this._labelShop;}

}
export default MainScreen;