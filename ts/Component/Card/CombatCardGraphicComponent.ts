import Container from "../../Container.js";
import AbstractPrintableCard from "../../Game/Card/AbstractPrintableCard.js";
import CardAnimation from "../../Game/Card/CardAnimation.js";
import AbstractGraphicComponent from "../AbstractGraphicComponent.js";
import AbstractCardGraphicComponent from "./AbstractCardGraphicComponent.js";

class CombatCardGraphicComponent extends AbstractCardGraphicComponent {
    protected _combatAnimation: number;
    protected _instanceHoverDamage: HTMLElement;
    protected _instanceAnimationDamage: HTMLElement;
    protected _instanceAnimationDie: HTMLElement;

    constructor(container:Container, card: AbstractPrintableCard) {
        super(container, card);
        this._combatAnimation = 0;

        const STYLE_PADDING = "5px";

        // LIFE
        const instanceContainerLife: HTMLElement = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceContainerLife.style.backgroundColor = "#333";
        instanceContainerLife.style.height = "6px";
        instanceContainerLife.style.width = "100%";
        instanceContainerLife.style.marginTop = "125px";
        instanceContainerLife.style.outline = "solid black 1px";
        instanceContainerLife.style.border = "solid white 1px";
        this._instanceCardContainer.appendChild(instanceContainerLife);

        this._instanceLife = this.getCurrentDocument().createElement('div');
        this._instanceLife.style.backgroundColor = "red";
        this._instanceLife.style.height = "100%";
        this._instanceLife.style.width = "100%";
        instanceContainerLife.appendChild(this._instanceLife);

        // HOVER DAMAGE
        const templateHover = this.getCurrentDocument().createElement('div');
        templateHover.style.position = "absolute";
        templateHover.style.width    = "100%";
        templateHover.style.height   = "100%";
        templateHover.style.top      = "0";
        templateHover.style.left     = "0";
        const instanceHoverDamage = <HTMLElement> templateHover.cloneNode(true);
        instanceHoverDamage.style.zIndex   = "5";
        this._instanceCardContainer.appendChild(instanceHoverDamage);
 
        this._instanceAnimationDamage = <HTMLElement> this.getCurrentDocument().createElement('div');
        this._instanceAnimationDamage.style.position = "absolute";
        this._instanceAnimationDamage.style.zIndex = "10";
        this._instanceAnimationDamage.style.color = "red";
        this._instanceAnimationDamage.style.fontSize = "40px";
        this._instanceAnimationDamage.style.webkitTextStroke =  "2px black";
        this._instanceAnimationDamage.style.textAlign = "center";
        this._instanceAnimationDamage.style.paddingTop = "30px";
        this._instanceAnimationDamage.style.opacity  = "0";
        this._instanceAnimationDamage.style.width = "calc(100% - ("+STYLE_PADDING+")*2)";
        instanceHoverDamage.appendChild(this._instanceAnimationDamage);

        this._instanceAnimationDie = <HTMLElement> this.getCurrentDocument().createElement('div');
        this._instanceAnimationDie.style.position = "absolute";
        this._instanceAnimationDie.style.zIndex = "20";
        this._instanceAnimationDie.style.color = "white";
        this._instanceAnimationDie.style.fontSize = "50px";
        this._instanceAnimationDie.style.webkitTextStroke =  "2px black";
        this._instanceAnimationDie.style.textAlign = "center";
        this._instanceAnimationDie.style.paddingTop = "20px";
        this._instanceAnimationDie.style.opacity  = "0";
        this._instanceAnimationDie.style.width = "calc(100% - ("+STYLE_PADDING+")*2)";
        instanceHoverDamage.appendChild(this._instanceAnimationDie);

        const instanceStyle = this.#getAnimationCombatCss();
        this._instanceContainer.appendChild(instanceStyle);        
    }

    internalLoop(): void {
        super.internalLoop();
        // _combatAnimation counter
        this._combatAnimation=this._combatAnimation+1;
        if (this._combatAnimation > (1000 / AbstractGraphicComponent.MS_LOOP())) {
            this.#cancelCombatAnimation();
        }
        // play all animations of combat
        this._card.getFightAnimationMap().forEach((animation) => {
            this.#combatAnimation(animation);
        });
        // then clean the animation list
        this._card.resetFigthAnimationMap();
        this.#lifeUpdate(); 
    
    }

    #lifeUpdate() {
        let percentageLife: number = Math.floor(this._card.getCurrentLife() / this._card.getMaxLife()  * 100);
        this._instanceLife.style.width = percentageLife + "%";
    }
 
    #combatAnimation(animation) {
        if (animation._type == CardAnimation.ATTACK()) {console.debug(this._card.getTitle() + " Start animation Card " + CardAnimation.ATTACK());
            // reset
            this._instanceContainer.style.animation = 'non';
            this._instanceContainer.offsetHeight;
            this._instanceContainer.style.animation = null;
            
            this._instanceContainer.style.animationDuration = "0.5s";
            this._instanceContainer.style.animationTimingFunction = "linear";

            if (this._card.isYours()) {
                this._instanceContainer.style.animationName = "attackCardHero";
            } else {
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
    }

    #cancelCombatAnimation() {
        this._instanceContainer.style.animation = 'non';
        this._instanceContainer.offsetHeight;
        this._instanceContainer.style.animation = null;

        this._instanceAnimationDie.style.animation = 'non';
        this._instanceAnimationDie.offsetHeight;
        this._instanceAnimationDie.style.animation = null;

        this._instanceAnimationDamage.style.animation = 'non';
        this._instanceAnimationDamage.offsetHeight;
        this._instanceAnimationDamage.style.animation = null;
    }
 
    #getAnimationCombatCss() {
        let keyframes = "";
        
        keyframes += `
        @keyframes attackCardHero {
            0%   {transform: translate(0, 0);}
            25%  {transform: translate(40px, 0px);}
            100% {transform: translate(0, 0);}
        }`;
    
        keyframes += `
        @keyframes attackCardEnemy {
            0%   {transform: translate(0, 0);}
            25%  {transform: translate(-40px, 0px);}
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

        
        let instanceStyle = this.getCurrentDocument().createElement( 'style' );
        instanceStyle.innerHTML = keyframes;
        return instanceStyle;
    }
}
customElements.define('combat-card', CombatCardGraphicComponent);
export default  CombatCardGraphicComponent;