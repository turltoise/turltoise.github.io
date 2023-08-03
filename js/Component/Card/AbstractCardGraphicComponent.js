var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractCardGraphicComponent_instances, _AbstractCardGraphicComponent_displayImg, _AbstractCardGraphicComponent_computeImg;
import AbstractGraphicComponent from "../AbstractGraphicComponent.js";
import F from "../../Game/Tools/F.js";
import SpriteManager from "./SpriteManager.js";
class AbstractCardGraphicComponent extends AbstractGraphicComponent {
    constructor(container, card) {
        super(container);
        _AbstractCardGraphicComponent_instances.add(this);
        this._card = card;
        this._title = card.getTitle();
        this._img = card.getImg();
        this._cardUUID = card.getUUID();
        this._card.setCombatSpriteText(SpriteManager.IMG_STAND());
        this._card.resetCombatSpriteIndex();
        this._card.resetCombatSpriteTimeCounter();
        this._actionLoop = 0;
        const STYLE_PADDING = "5px";
        this._instanceCardContainer = this.getCurrentDocument().createElement('div');
        this._instanceCardContainer.style.fontSize = "100%";
        this._instanceCardContainer.style.borderRadius = "5px";
        this._instanceCardContainer.style.padding = STYLE_PADDING;
        this._instanceCardContainer.style.width = "100px";
        this._instanceCardContainer.style.height = "150px";
        //this._instanceCardContainer.style.backgroundColor = "#EEAAEE"; // HERE WE WILL CHANGE WITH BACKGROUND IMG
        this._instanceCardContainer.style.border = "3px solid #333"; // HERE WE DEFINE BORDER COLOR
        this._instanceCardContainer.style.position = "relative";
        this._instanceCardContainer.style.textAlign = "left";
        this._instanceContainer.appendChild(this._instanceCardContainer);
        const templateHover = this.getCurrentDocument().createElement('div');
        templateHover.style.position = "absolute";
        templateHover.style.width = "100%";
        templateHover.style.height = "100%";
        templateHover.style.top = "0";
        templateHover.style.left = "0";
        const instanceCardTitle = this.getCurrentDocument().createElement('div');
        instanceCardTitle.innerHTML = this._title;
        instanceCardTitle.style.fontSize = "12px";
        instanceCardTitle.style.textAlign = "center";
        instanceCardTitle.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        instanceCardTitle.style.color = "white";
        instanceCardTitle.style.padding = "2px";
        this._instanceCardContainer.appendChild(instanceCardTitle);
        this._instanceCardImg = this.getCurrentDocument().createElement('img');
        this._instanceCardImg.setAttribute('class', this.getClassName('img'));
        this._instanceCardImg.style.position = "absolute";
        this._instanceCardImg.style.bottom = "0%";
        this._instanceCardImg.style.left = "50%";
        let translate = F.sprintf('translate(%s, %s)', card.getCardGraphicSetting()._xSprite, card.getCardGraphicSetting()._ySprite);
        this._instanceCardImg.style.transform = translate;
        console.log(this.constructor.name);
        if (this._card.isYours() && this.constructor.name == "CombatCardGraphicComponent") {
            this._instanceCardImg.style.transform = translate + " scaleX(-1)";
        }
        this._instanceCardContainer.appendChild(this._instanceCardImg);
    }
    internalLoop() {
        __classPrivateFieldGet(this, _AbstractCardGraphicComponent_instances, "m", _AbstractCardGraphicComponent_displayImg).call(this);
    }
}
_AbstractCardGraphicComponent_instances = new WeakSet(), _AbstractCardGraphicComponent_displayImg = function _AbstractCardGraphicComponent_displayImg() {
    this._actionLoop += 1;
    if (AbstractGraphicComponent.MS_LOOP() * this._actionLoop >= 150) {
        let imgUrl = __classPrivateFieldGet(this, _AbstractCardGraphicComponent_instances, "m", _AbstractCardGraphicComponent_computeImg).call(this);
        if (this._card.getCombatSpriteIndex() > -1) {
            this._instanceCardImg.src = imgUrl;
        }
        this._actionLoop = 0;
    }
}, _AbstractCardGraphicComponent_computeImg = function _AbstractCardGraphicComponent_computeImg() {
    let spriteManager = this._container.get(SpriteManager.name);
    spriteManager.compute(this._card);
    return F.sprintf('img/%s/%s_%s.png', this._img, this._card.getCombatSpriteText(), this._card.getCombatSpriteIndex());
};
export default AbstractCardGraphicComponent;
//# sourceMappingURL=AbstractCardGraphicComponent.js.map