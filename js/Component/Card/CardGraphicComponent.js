var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CardGraphicComponent_instances, _CardGraphicComponent_lifeUpdate, _CardGraphicComponent_isInAdventurePanel, _CardGraphicComponent_cancelCombatAnimation, _CardGraphicComponent_combatAnimation, _CardGraphicComponent_getAnimationCss;
import CardAnimation from "../../Game/Card/CardAnimation.js";
import AbstractGraphicComponent from "../AbstractGraphicComponent.js";
class CardGraphicComponent extends AbstractGraphicComponent {
    constructor(container, card) {
        super(container);
        _CardGraphicComponent_instances.add(this);
        if (card.constructor.name != "Hero"
            && card.constructor.name != "Enemy" &&
            card.constructor.name != "Item") {
            console.warn("Card not of type Hero, Enemy or Item: " + card.constructor.name + " " + card.getTitle());
        }
        this._card = card;
        this._title = card.getTitle();
        this._img = card.getImg();
        //this._strength  = card.getStrength();
        this._life = card.getDisplayableLife();
        this._cardUUID = card.getUUID();
        this._combatAnimation = 0;
        //# on se retrouve avec plusieurs div avec le même id
        const STYLE_PADDING = "5px";
        const instanceCardContainer = this.getCurrentDocument().createElement('div');
        instanceCardContainer.style.fontSize = "100%";
        instanceCardContainer.style.borderRadius = "5px";
        instanceCardContainer.style.padding = STYLE_PADDING;
        instanceCardContainer.style.width = "100px";
        instanceCardContainer.style.height = "150px";
        instanceCardContainer.style.backgroundColor = "#EEAAEE"; // HERE WE WILL CHANGE WITH BACKGROUND IMG
        instanceCardContainer.style.border = "3px solid #AA00AA"; // HERE WE DEFINE BORDER COLOR
        instanceCardContainer.style.position = "relative";
        instanceCardContainer.style.textAlign = "left";
        instanceCardContainer.setAttribute('class', CardGraphicComponent.getCardContainerClass());
        const templateHover = this.getCurrentDocument().createElement('div');
        templateHover.style.position = "absolute";
        templateHover.style.width = "100%";
        templateHover.style.height = "100%";
        templateHover.style.top = "0";
        templateHover.style.left = "0";
        this._instanceAnimationDamage = this.getCurrentDocument().createElement('div');
        this._instanceAnimationDamage.style.position = "absolute";
        this._instanceAnimationDamage.style.zIndex = "10";
        this._instanceAnimationDamage.style.color = "red";
        this._instanceAnimationDamage.style.fontSize = "40px";
        this._instanceAnimationDamage.style.webkitTextStroke = "2px black";
        this._instanceAnimationDamage.style.textAlign = "center";
        this._instanceAnimationDamage.style.paddingTop = "30px";
        this._instanceAnimationDamage.style.opacity = "0";
        this._instanceAnimationDamage.style.width = "calc(100% - (" + STYLE_PADDING + ")*2)";
        this._instanceAnimationDie = this.getCurrentDocument().createElement('div');
        this._instanceAnimationDie.style.position = "absolute";
        this._instanceAnimationDie.style.zIndex = "20";
        this._instanceAnimationDie.style.color = "white";
        this._instanceAnimationDie.style.fontSize = "50px";
        this._instanceAnimationDie.style.webkitTextStroke = "2px black";
        this._instanceAnimationDie.style.textAlign = "center";
        this._instanceAnimationDie.style.paddingTop = "20px";
        this._instanceAnimationDie.style.opacity = "0";
        this._instanceAnimationDie.style.width = "calc(100% - (" + STYLE_PADDING + ")*2)";
        const instanceCardTitle = this.getCurrentDocument().createElement('div');
        instanceCardTitle.innerHTML = this._title;
        const instanceCardImg = this.getCurrentDocument().createElement('img');
        instanceCardImg.setAttribute('class', this.getClassName('img'));
        instanceCardImg.style.maxWidth = "100%";
        instanceCardImg.style.maxHeight = "100%";
        instanceCardImg.src = "img/" + this._img;
        instanceCardContainer.appendChild(instanceCardTitle);
        instanceCardContainer.appendChild(instanceCardImg);
        const instanceStyle = __classPrivateFieldGet(this, _CardGraphicComponent_instances, "m", _CardGraphicComponent_getAnimationCss).call(this);
        this._instanceContainer.appendChild(instanceStyle);
        this._instanceContainer.appendChild(instanceCardContainer);
        this._instanceHoverDamage = templateHover.cloneNode(true);
        this._instanceHoverDamage.style.zIndex = "5";
        this._instanceHoverDamage.appendChild(this._instanceAnimationDamage);
        this._instanceHoverDamage.appendChild(this._instanceAnimationDie);
        instanceCardContainer.appendChild(this._instanceHoverDamage);
    }
    getCardUUID() {
        return this._cardUUID;
    }
    static getCardContainerClass() {
        return 'CardGraphicComponent-card-container';
    }
    internalLoop() {
        // _combatAnimation counter
        this._combatAnimation = this._combatAnimation + 1;
        if (this._combatAnimation > (1000 / AbstractGraphicComponent.MS_LOOP())) {
            __classPrivateFieldGet(this, _CardGraphicComponent_instances, "m", _CardGraphicComponent_cancelCombatAnimation).call(this);
        }
        if (__classPrivateFieldGet(this, _CardGraphicComponent_instances, "m", _CardGraphicComponent_isInAdventurePanel).call(this)) {
            // play all animations of combat
            this._card.getFightAnimationMap().forEach((animation) => {
                __classPrivateFieldGet(this, _CardGraphicComponent_instances, "m", _CardGraphicComponent_combatAnimation).call(this, animation);
            });
            // then clean the animation list
            this._card.resetFigthAnimationMap();
            __classPrivateFieldGet(this, _CardGraphicComponent_instances, "m", _CardGraphicComponent_lifeUpdate).call(this);
        }
    }
}
_CardGraphicComponent_instances = new WeakSet(), _CardGraphicComponent_lifeUpdate = function _CardGraphicComponent_lifeUpdate() {
    //this._instanceCardLife.innerHTML = Number.displayNumber(this._card.getDisplayableLife());
}, _CardGraphicComponent_isInAdventurePanel = function _CardGraphicComponent_isInAdventurePanel() {
    if (this.parentElement.classList.contains('AdventureSceneGraphicComponent-container-card')) {
        return true;
    }
    return false;
}, _CardGraphicComponent_cancelCombatAnimation = function _CardGraphicComponent_cancelCombatAnimation() {
    this._instanceContainer.style.animation = 'non';
    this._instanceContainer.offsetHeight;
    this._instanceContainer.style.animation = null;
    this._instanceAnimationDie.style.animation = 'non';
    this._instanceAnimationDie.offsetHeight;
    this._instanceAnimationDie.style.animation = null;
    this._instanceAnimationDamage.style.animation = 'non';
    this._instanceAnimationDamage.offsetHeight;
    this._instanceAnimationDamage.style.animation = null;
}, _CardGraphicComponent_combatAnimation = function _CardGraphicComponent_combatAnimation(animation) {
    if (animation._type == CardAnimation.ATTACK()) {
        console.debug(this._card.getTitle() + " Start animation Card " + CardAnimation.ATTACK());
        // reset
        this._instanceContainer.style.animation = 'non';
        this._instanceContainer.offsetHeight;
        this._instanceContainer.style.animation = null;
        this._instanceContainer.style.animationDuration = "0.5s";
        this._instanceContainer.style.animationTimingFunction = "linear";
        if (this._card.isYours()) {
            this._instanceContainer.style.animationName = "attackCardHero";
        }
        else {
            this._instanceContainer.style.animationName = "attackCardEnemy";
        }
        this._instanceContainer.style.animationDelay = "0ms";
        this._instanceContainer.style.animationIterationCount = "1";
        this._instanceContainer.style.animationDirection = "normal";
        this._instanceContainer.style.animationFillMode = "none";
        this._instanceContainer.style.animationPlayState = "running";
        //this._instanceContainer.style.animationTimeline = "auto";
        this._combatAnimation = 0;
    }
    if (animation._type == CardAnimation.DIE()) {
        // reset
        this._instanceAnimationDie.style.animation = 'non';
        this._instanceAnimationDie.offsetHeight;
        this._instanceAnimationDie.style.animation = null;
        this._instanceAnimationDie.innerHTML = "DEAD";
        this._instanceAnimationDie.style.animationDuration = "1s";
        this._instanceAnimationDie.style.animationTimingFunction = "linear";
        this._instanceAnimationDie.style.animationName = "die";
        this._instanceAnimationDie.style.animationDelay = "250ms";
        this._instanceAnimationDie.style.animationIterationCount = "1";
        this._instanceAnimationDie.style.animationDirection = "normal";
        this._instanceAnimationDie.style.animationFillMode = "none";
        this._instanceAnimationDie.style.animationPlayState = "running";
        //this._instanceAnimationDie.style.animationTimeline = "auto";
        //this._instanceAnimationDie.style.webkitAnimationFillMode = "forwards";
        this._combatAnimation = 0;
    }
    if (animation._type == CardAnimation.DAMAGE()) {
        // reset
        this._instanceAnimationDamage.style.animation = 'non';
        this._instanceAnimationDamage.offsetHeight;
        this._instanceAnimationDamage.style.animation = null;
        this._instanceAnimationDamage.innerHTML = animation._data1;
        this._instanceAnimationDamage.style.animationDuration = "1s";
        this._instanceAnimationDamage.style.animationTimingFunction = "linear";
        this._instanceAnimationDamage.style.animationName = "damage";
        this._instanceAnimationDamage.style.animationDelay = "250ms";
        this._instanceAnimationDamage.style.animationIterationCount = "1";
        this._instanceAnimationDamage.style.animationDirection = "normal";
        this._instanceAnimationDamage.style.animationFillMode = "none";
        this._instanceAnimationDamage.style.animationPlayState = "running";
        //this._instanceAnimationDamage.style.animationTimeline = "auto";
        //this._instanceAnimationDamage.style.webkitAnimationFillMode = "forwards";
        this._combatAnimation = 0;
    }
}, _CardGraphicComponent_getAnimationCss = function _CardGraphicComponent_getAnimationCss() {
    let keyframes = "";
    keyframes += `
        @keyframes attackCardHero {
            0%   {transform: translate(0, 0);}
            25%  {transform: translate(0, -40px);}
            100% {transform: translate(0, 0);}
        }`;
    keyframes += `
        @keyframes attackCardEnemy {
            0%   {transform: translate(0, 0);}
            25%  {transform: translate(0, 40px);}
            100% {transform: translate(0, 0);}
        }`;
    keyframes += `
        @keyframes damage {
            0%   {transform: translate(0, 0);    opacity: 1;}
            100% {transform: translate(0, 100px);  opacity: 0;}
        }`;
    keyframes += `
        @keyframes die {
            0%   {transform: translate(0, 0);    opacity: 1;}
            100% {transform: translate(0, 100px);  opacity: 0;}
        }`;
    let instanceStyle = this.getCurrentDocument().createElement('style');
    instanceStyle.innerHTML = keyframes;
    return instanceStyle;
};
customElements.define('card-card', CardGraphicComponent);
export default CardGraphicComponent;
//# sourceMappingURL=CardGraphicComponent.js.map