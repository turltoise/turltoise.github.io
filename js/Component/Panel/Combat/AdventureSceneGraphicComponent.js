var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AdventureSceneGraphicComponent_instances, _AdventureSceneGraphicComponent_displayCard;
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CombatCardGraphicComponent from "../../Card/CombatCardGraphicComponent.js";
class AdventureSceneGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        _AdventureSceneGraphicComponent_instances.add(this);
        const templateContainerCard = this.getCurrentDocument().createElement('div');
        templateContainerCard.setAttribute('class', this.getClassName('container-card'));
        //templateContainerCard.style.backgroundColor = "#88AA33";
        templateContainerCard.style.display = "inline-block";
        templateContainerCard.style.verticalAlign = "top";
        //templateContainerCard.style.margin = "5px";
        templateContainerCard.style.padding = "5px";
        this._templateContainerCard = templateContainerCard;
        const templateCardListView = this.getCurrentDocument().createElement('div');
        //templateCardListView.style.marginBottom = "20px";
        templateCardListView.style.padding = "10px";
        templateCardListView.style.boxSizing = "border-box";
        templateCardListView.style.height = "200px";
        this._templateCardListView = templateCardListView;
        this.render();
    }
    render() {
        this._interfaceEnemyView = this._templateCardListView.cloneNode(true);
        this._interfaceEnemyView.setAttribute('class', this.getClassName('enemy-view'));
        this._interfaceEnemyView.style.height = "210px";
        this._interfaceEnemyView.style.textAlign = "right";
        this._interfaceEnemyView.style.backgroundPosition = "bottom 0px right 0px";
        this._interfaceEnemyView.style.backgroundImage = "url(./img/world/Meadow_platform.png)";
        this._interfaceEnemyView.style.backgroundRepeat = "no-repeat";
        this._interfaceEnemyView.setAttribute('id', AdventureSceneGraphicComponent.ID_ENEMY_VIEW());
        this._interfaceDeckView = this._templateCardListView.cloneNode(true);
        this._interfaceDeckView.setAttribute('class', this.getClassName('deck-view'));
        this._interfaceDeckView.style.height = "300px";
        this._interfaceDeckView.style.backgroundPosition = "bottom 0px right 0px";
        this._interfaceDeckView.style.backgroundImage = "url(./img/world/Meadow_ground.png)";
        this._interfaceDeckView.style.backgroundRepeat = "no-repeat";
        this._interfaceDeckView.setAttribute('id', AdventureSceneGraphicComponent.ID_DECK_VIEW());
        this._instanceContainer.appendChild(this._interfaceEnemyView);
        this._instanceContainer.appendChild(this._interfaceDeckView);
    }
    cleanHeroCards() {
        this._interfaceDeckView.innerHTML = "";
    }
    cleanEnemyCards() {
        this._interfaceEnemyView.innerHTML = "";
    }
    displayHeroCards(heroList) {
        __classPrivateFieldGet(this, _AdventureSceneGraphicComponent_instances, "m", _AdventureSceneGraphicComponent_displayCard).call(this, heroList, this._interfaceDeckView);
    }
    displayEnemyCards(enemyList) {
        __classPrivateFieldGet(this, _AdventureSceneGraphicComponent_instances, "m", _AdventureSceneGraphicComponent_displayCard).call(this, enemyList, this._interfaceEnemyView);
    }
    static ID_DECK_VIEW() { return "id-deck-view"; }
    static ID_ENEMY_VIEW() { return "id-enemy-view"; }
}
_AdventureSceneGraphicComponent_instances = new WeakSet(), _AdventureSceneGraphicComponent_displayCard = function _AdventureSceneGraphicComponent_displayCard(cardList, interfaceView) {
    const self = this;
    cardList.forEach((card) => {
        const instanceContainerCard = this._templateContainerCard.cloneNode(true);
        instanceContainerCard.appendChild(new CombatCardGraphicComponent(self._container, card));
        interfaceView.appendChild(instanceContainerCard);
    });
};
customElements.define('adventure-adventure', AdventureSceneGraphicComponent);
export default AdventureSceneGraphicComponent;
//# sourceMappingURL=AdventureSceneGraphicComponent.js.map