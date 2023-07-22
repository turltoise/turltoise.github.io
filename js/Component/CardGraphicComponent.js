var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CardGraphicComponent_instances, _CardGraphicComponent_lifeUpdate, _CardGraphicComponent_isInAdventurePanel, _CardGraphicComponent_cancelCombatAnimation, _CardGraphicComponent_combatAnimation;
import CardAnimation from "../Game/Card/CardAnimation.js";
import Number from "../Game/Tools/Number.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
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
        const templateCardContainer = this.getCurrentDocument().createElement('div');
        templateCardContainer.style.fontSize = "100%";
        templateCardContainer.style.borderRadius = "5px";
        templateCardContainer.style.padding = STYLE_PADDING;
        templateCardContainer.style.width = "100px";
        templateCardContainer.style.height = "150px";
        templateCardContainer.style.backgroundColor = "#EEAAEE";
        templateCardContainer.style.border = "3px solid #AA00AA";
        templateCardContainer.style.position = "relative";
        templateCardContainer.style.textAlign = "left";
        this._templateCardContainer = templateCardContainer;
        const templateHover = this.getCurrentDocument().createElement('div');
        templateHover.style.position = "absolute";
        templateHover.style.width = "100%";
        templateHover.style.height = "100%";
        templateHover.style.top = "0";
        templateHover.style.left = "0";
        templateHover.style.zIndex = "5";
        //templateHover.style.backgroundColor = "#fafafa";
        // TO DO
        //templateHover.style.visibility = "hidden";
        const templateAnimationDamage = this.getCurrentDocument().createElement('div');
        templateAnimationDamage.style.position = "absolute";
        templateAnimationDamage.style.zIndex = "10";
        templateAnimationDamage.style.color = "red";
        templateAnimationDamage.style.fontSize = "40px";
        templateAnimationDamage.style.webkitTextStroke = "2px black";
        templateAnimationDamage.style.textAlign = "center";
        templateAnimationDamage.style.paddingTop = "30px";
        templateAnimationDamage.style.opacity = "0";
        templateAnimationDamage.style.width = "calc(100% - (" + STYLE_PADDING + ")*2)";
        const templateAnimationDie = this.getCurrentDocument().createElement('div');
        templateAnimationDie.style.position = "absolute";
        templateAnimationDie.style.zIndex = "20";
        templateAnimationDie.style.color = "white";
        templateAnimationDie.style.fontSize = "50px";
        templateAnimationDie.style.webkitTextStroke = "2px black";
        templateAnimationDie.style.textAlign = "center";
        templateAnimationDie.style.paddingTop = "20px";
        templateAnimationDie.style.opacity = "0";
        templateAnimationDie.style.width = "calc(100% - (" + STYLE_PADDING + ")*2)";
        const templateCardTitle = this.getCurrentDocument().createElement('div');
        templateCardTitle.setAttribute('class', this.getClassName('title'));
        this._templateCardTitle = templateCardTitle;
        const templateCardImg = this.getCurrentDocument().createElement('img');
        templateCardImg.setAttribute('class', this.getClassName('img'));
        templateCardImg.style.maxWidth = "100%";
        templateCardImg.style.maxHeight = "100%";
        this._templateCardImg = templateCardImg;
        const templateCardDesc = this.getCurrentDocument().createElement('div');
        templateCardDesc.setAttribute('class', this.getClassName('description'));
        templateCardDesc.style.fontSize = "80%";
        this._templateCardDesc = templateCardDesc;
        const templateCardStatContainer = this.getCurrentDocument().createElement('div');
        templateCardStatContainer.setAttribute('class', this.getClassName('stat-container'));
        templateCardStatContainer.style.position = "absolute";
        templateCardStatContainer.style.width = "calc(100% - (" + STYLE_PADDING + ")*2)";
        templateCardStatContainer.style.bottom = STYLE_PADDING;
        this._templateCardStatContainer = templateCardStatContainer;
        const templateCardStat = this.getCurrentDocument().createElement('div');
        templateCardStat.setAttribute('class', this.getClassName('stat'));
        templateCardStat.style.position = "relative";
        templateCardStat.style.textAlign = "center";
        this._templateCardStat = templateCardStat;
        // for strenght slash & life instance
        const templateStatElem = this.getCurrentDocument().createElement('div');
        templateStatElem.setAttribute('class', this.getClassName('stat-elem'));
        templateStatElem.style.position = "relative";
        //templateStatElem.style.display = "inline-block";
        templateStatElem.style.margin = "0 auto";
        templateStatElem.style.fontSize = "70%";
        this._templateStatElem = templateStatElem;
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
        let templateStyle = this.getCurrentDocument().createElement('style');
        templateStyle.innerHTML = keyframes;
        this._templateStyle = templateStyle;
        const instanceCardContainer = this._templateCardContainer.cloneNode(true);
        const instanceStyle = this._templateStyle.cloneNode(true);
        instanceCardContainer.setAttribute('class', CardGraphicComponent.getCardContainerClass());
        const instanceCardTitle = this._templateCardTitle.cloneNode(true);
        instanceCardTitle.innerHTML = this._title;
        const instanceCardImg = this._templateCardImg.cloneNode(true);
        instanceCardImg.innerHTML = "Card Img";
        instanceCardImg.src = "img/" + this._img;
        const instanceCardDesc = this._templateCardDesc.cloneNode(true);
        instanceCardDesc.innerHTML = "DESCRIPTIONN";
        const instanceCardStatContainer = this._templateCardStatContainer.cloneNode(true);
        const instanceCardStat = this._templateCardStat.cloneNode(true);
        const instanceCardStrength = this._templateStatElem.cloneNode(true);
        instanceCardStrength.innerHTML = Number.displayNumber(0);
        const instanceCardSlashStat = this._templateStatElem.cloneNode(true);
        instanceCardSlashStat.innerHTML = "&nbsp;-&nbsp;";
        this._instanceCardLife = this._templateStatElem.cloneNode(true);
        this._instanceCardLife.innerHTML = Number.displayNumber(0);
        instanceCardStat.appendChild(instanceCardStrength);
        instanceCardStat.appendChild(instanceCardSlashStat);
        instanceCardStat.appendChild(this._instanceCardLife);
        instanceCardStatContainer.appendChild(instanceCardStat);
        instanceCardContainer.appendChild(instanceCardTitle);
        instanceCardContainer.appendChild(instanceCardImg);
        instanceCardContainer.appendChild(instanceCardDesc);
        instanceCardContainer.appendChild(instanceCardStatContainer);
        this._instanceContainer.appendChild(instanceStyle);
        this._instanceContainer.appendChild(instanceCardContainer);
        this._instanceHover = templateHover.cloneNode(true);
        this._instanceAnimationDamage = templateAnimationDamage.cloneNode(true);
        this._instanceAnimationDie = templateAnimationDie.cloneNode(true);
        this._instanceHover.appendChild(this._instanceAnimationDamage);
        this._instanceHover.appendChild(this._instanceAnimationDie);
        instanceCardContainer.appendChild(this._instanceHover);
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
    this._instanceCardLife.innerHTML = Number.displayNumber(this._card.getDisplayableLife());
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
        this._instanceAnimationDie.style.webkitAnimationFillMode = "forwards";
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
        this._instanceAnimationDamage.style.webkitAnimationFillMode = "forwards";
        this._combatAnimation = 0;
    }
};
customElements.define('card-card', CardGraphicComponent);
export default CardGraphicComponent;
//# sourceMappingURL=CardGraphicComponent.js.map