import Container from "../../../Container.js";
import CollectionCard from "../../../Game/Card/CollectionCard.js";
import AbstractCapacity from "../../../Game/Fight/Capacity/List/AbstractCapacity.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";

class CardPreviewGraphicComponent extends AbstractGraphicComponent {
    private _card: CollectionCard;
    constructor(container: Container, card: CollectionCard) {
        super(container);
        this._card = card;

        this._instanceContainer.style.width = "80%";
        this._instanceContainer.style.backgroundColor = "red";
        this._instanceContainer.style.display = "inline-block";
        this._instanceContainer.style.textAlign = "center";
        this._instanceContainer.style.padding = "20px";
        this._instanceContainer.style.borderRadius = "3px";
        
        let instanceTitlePreview = this.getCurrentDocument().createElement('div');
        instanceTitlePreview.innerHTML = "Character sheet";
        instanceTitlePreview.style.fontSize = "20px";
        instanceTitlePreview.style.textAlign = "left";
        instanceTitlePreview.style.marginBottom = "20px";
        instanceTitlePreview.style.fontWeight = "bold";
        
        let instanceContainerMainData = this.getCurrentDocument().createElement('div');
        instanceContainerMainData.style.width = "45%";
        instanceContainerMainData.style.display = "inline-block";
        instanceContainerMainData.style.verticalAlign = "top";

        let instanceContainerCenter = this.getCurrentDocument().createElement('div');
        instanceContainerCenter.style.width = "10%";
        instanceContainerCenter.style.display = "inline-block";
        instanceContainerCenter.style.verticalAlign = "top";

        let instanceContainerSecondaryData = this.getCurrentDocument().createElement('div');
        instanceContainerSecondaryData.style.width = "45%";
        instanceContainerSecondaryData.style.display = "inline-block";
        instanceContainerSecondaryData.style.verticalAlign = "top";

        let instanceTitleCapacities = this.getCurrentDocument().createElement('div');
        instanceTitleCapacities.innerHTML = "Capacities";
        instanceTitleCapacities.style.fontSize = "16px";
        instanceTitleCapacities.style.textAlign = "left";
        instanceTitleCapacities.style.marginBottom = "20px";
        instanceTitleCapacities.style.fontWeight = "bold";
        let instanceContainerCapacities = this.getCurrentDocument().createElement('div');
        instanceContainerCapacities.style.textAlign = "left";
        instanceContainerCapacities.style.marginBottom = "40px";

        let instanceTitleItems = this.getCurrentDocument().createElement('div');
        instanceTitleItems.innerHTML = "Items";
        instanceTitleItems.style.fontSize = "16px";
        instanceTitleItems.style.textAlign = "left";
        instanceTitleItems.style.marginBottom = "20px";
        instanceTitleItems.style.fontWeight = "bold";
        let instanceContainerItems = this.getCurrentDocument().createElement('div');
        instanceContainerItems.style.marginBottom = "40px";

        this._instanceContainer.appendChild(instanceTitlePreview);
        this._instanceContainer.appendChild(instanceContainerMainData);
        this._instanceContainer.appendChild(instanceContainerCenter);
        this._instanceContainer.appendChild(instanceContainerSecondaryData);
        this._instanceContainer.appendChild(instanceTitleCapacities);
        this._instanceContainer.appendChild(instanceContainerCapacities);
        this._instanceContainer.appendChild(instanceTitleItems);
        this._instanceContainer.appendChild(instanceContainerItems);

        let instanceCardontainer = this.getCurrentDocument().createElement('div');
        instanceCardontainer.style.display  = "inline-block";
        instanceCardontainer.style.marginTop = "50px";
        const graphicCard: CollectionCardGraphicComponent = new CollectionCardGraphicComponent(this._container, this._card);
        instanceCardontainer.appendChild(graphicCard);
     
        instanceContainerMainData.appendChild(instanceCardontainer);
        let instanceHackCardInMiddle = this.getCurrentDocument().createElement('div');
        instanceHackCardInMiddle.style.height = "50px";
        instanceHackCardInMiddle.style.width = "100%";
        instanceContainerMainData.appendChild(instanceHackCardInMiddle);

        let templateMainCaracContainer = this.getCurrentDocument().createElement('div');
        templateMainCaracContainer.style.width = "100%";
        templateMainCaracContainer.style.display = "inline-block";
        templateMainCaracContainer.style.marginBottom = "5px";
        

        let templateMainCaracText = this.getCurrentDocument().createElement('div');
        templateMainCaracText.style.display = "inline-block";
        templateMainCaracText.style.width = "70%";
        templateMainCaracText.style.textAlign = "left";
        templateMainCaracText.style.color = "#3700b3";

        let templateMainCaracValue = this.getCurrentDocument().createElement('div');
        templateMainCaracValue.style.display = "inline-block";
        templateMainCaracValue.style.width = "30%";
        templateMainCaracValue.style.textAlign = "right";

        let templateSecondaryCaracContainer = this.getCurrentDocument().createElement('div');
        templateSecondaryCaracContainer.style.width = "100%";
        templateSecondaryCaracContainer.style.display = "inline-block";
        templateSecondaryCaracContainer.style.marginBottom = "5px";

        let templateSecondaryCaracText = this.getCurrentDocument().createElement('div');
        templateSecondaryCaracText.style.display = "inline-block";
        templateSecondaryCaracText.style.width = "70%";
        templateSecondaryCaracText.style.textAlign = "left";
        templateSecondaryCaracText.style.color = "#3700b3";

        let templateSecondaryCaracValue = this.getCurrentDocument().createElement('div');
        templateSecondaryCaracValue.style.display = "inline-block";
        templateSecondaryCaracValue.style.width = "30%";
        templateSecondaryCaracValue.style.textAlign = "right";

        let templateBlockSeperateSecondaryData = this.getCurrentDocument().createElement('div');
        templateBlockSeperateSecondaryData.style.height = "10px";
        
        // Strength
        let instanceMainCaracContainerStrength = <HTMLElement> templateMainCaracContainer.cloneNode(true);
        let instanceMainCaracTextStrength = <HTMLElement> templateMainCaracText.cloneNode(true);
        instanceMainCaracTextStrength.innerHTML = "Strength";
        let instanceMainCaracValueStrength = <HTMLElement> templateMainCaracValue.cloneNode(true);
        instanceMainCaracValueStrength.innerHTML = this._card.getStrength();
        instanceMainCaracContainerStrength.appendChild(instanceMainCaracTextStrength);
        instanceMainCaracContainerStrength.appendChild(instanceMainCaracValueStrength);
        instanceContainerMainData.appendChild(instanceMainCaracContainerStrength);

        // Dexterity
        let instanceMainCaracContainerDexterity = <HTMLElement> templateMainCaracContainer.cloneNode(true);
        let instanceMainCaracTextDexterity = <HTMLElement> templateMainCaracText.cloneNode(true);
        instanceMainCaracTextDexterity.innerHTML = "Dexterity";
        let instanceMainCaracValueDexterity = <HTMLElement> templateMainCaracValue.cloneNode(true);
        instanceMainCaracValueDexterity.innerHTML = this._card.getDexterity();
        instanceMainCaracContainerDexterity.appendChild(instanceMainCaracTextDexterity);
        instanceMainCaracContainerDexterity.appendChild(instanceMainCaracValueDexterity);
        instanceContainerMainData.appendChild(instanceMainCaracContainerDexterity);

        // Intelligence
        let instanceMainCaracContainerIntelligence = <HTMLElement> templateMainCaracContainer.cloneNode(true);
        let instanceMainCaracTextIntelligence = <HTMLElement> templateMainCaracText.cloneNode(true);
        instanceMainCaracTextIntelligence.innerHTML = "Intelligence";
        let instanceMainCaracValueIntelligence = <HTMLElement> templateMainCaracValue.cloneNode(true);
        instanceMainCaracValueIntelligence.innerHTML = this._card.getIntelligence();
        instanceMainCaracContainerIntelligence.appendChild(instanceMainCaracTextIntelligence);
        instanceMainCaracContainerIntelligence.appendChild(instanceMainCaracValueIntelligence);
        instanceContainerMainData.appendChild(instanceMainCaracContainerIntelligence);

        // Luck
        let instanceMainCaracContainerLuck = <HTMLElement> templateMainCaracContainer.cloneNode(true);
        let instanceMainCaracTextLuck = <HTMLElement> templateMainCaracText.cloneNode(true);
        instanceMainCaracTextLuck.innerHTML = "Luck";
        let instanceMainCaracValueLuck = <HTMLElement> templateMainCaracValue.cloneNode(true);
        instanceMainCaracValueLuck.innerHTML = this._card.getLuck();
        instanceMainCaracContainerLuck.appendChild(instanceMainCaracTextLuck);
        instanceMainCaracContainerLuck.appendChild(instanceMainCaracValueLuck);
        instanceContainerMainData.appendChild(instanceMainCaracContainerLuck);
    
        // PhysicalDamage
        let instanceSecondaryCaracContainerPhysicalDamage = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextPhysicalDamage = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextPhysicalDamage.innerHTML = "PhysicalDamage";
        let instanceSecondaryCaracValuePhysicalDamage = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValuePhysicalDamage.innerHTML = this._card.getPhysicalDamage();
        instanceSecondaryCaracContainerPhysicalDamage.appendChild(instanceSecondaryCaracTextPhysicalDamage);
        instanceSecondaryCaracContainerPhysicalDamage.appendChild(instanceSecondaryCaracValuePhysicalDamage);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerPhysicalDamage);

        // PhysicalCriticalRate
        let instanceSecondaryCaracContainerPhysicalCriticalRate = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextPhysicalCriticalRate = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextPhysicalCriticalRate.innerHTML = "PhysicalCriticalRate";
        let instanceSecondaryCaracValuePhysicalCriticalRate = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValuePhysicalCriticalRate.innerHTML = this._card.getPhysicalCriticalRate();
        instanceSecondaryCaracContainerPhysicalCriticalRate.appendChild(instanceSecondaryCaracTextPhysicalCriticalRate);
        instanceSecondaryCaracContainerPhysicalCriticalRate.appendChild(instanceSecondaryCaracValuePhysicalCriticalRate);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerPhysicalCriticalRate);

        // PhysicalCriticalNumber
        let instanceSecondaryCaracContainerPhysicalCriticalNumber = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextPhysicalCriticalNumber = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextPhysicalCriticalNumber.innerHTML = "PhysicalCriticalNumber";
        let instanceSecondaryCaracValuePhysicalCriticalNumber = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValuePhysicalCriticalNumber.innerHTML = this._card.getPhysicalCriticalNumber();
        instanceSecondaryCaracContainerPhysicalCriticalNumber.appendChild(instanceSecondaryCaracTextPhysicalCriticalNumber);
        instanceSecondaryCaracContainerPhysicalCriticalNumber.appendChild(instanceSecondaryCaracValuePhysicalCriticalNumber);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerPhysicalCriticalNumber);
        
        let instanceBlockSeperateSecondaryData1 = <HTMLElement> templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData1);

        // MagicDamage
        let instanceSecondaryCaracContainerMagicDamage = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextMagicDamage = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextMagicDamage.innerHTML = "MagicDamage";
        let instanceSecondaryCaracValueMagicDamage = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueMagicDamage.innerHTML = this._card.getMagicDamage();
        instanceSecondaryCaracContainerMagicDamage.appendChild(instanceSecondaryCaracTextMagicDamage);
        instanceSecondaryCaracContainerMagicDamage.appendChild(instanceSecondaryCaracValueMagicDamage);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerMagicDamage);

        // MagicCriticalRate
        let instanceSecondaryCaracContainerMagicCriticalRate = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextMagicCriticalRate = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextMagicCriticalRate.innerHTML = "MagicCriticalRate";
        let instanceSecondaryCaracValueMagicCriticalRate = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueMagicCriticalRate.innerHTML = this._card.getMagicCriticalRate();
        instanceSecondaryCaracContainerMagicCriticalRate.appendChild(instanceSecondaryCaracTextMagicCriticalRate);
        instanceSecondaryCaracContainerMagicCriticalRate.appendChild(instanceSecondaryCaracValueMagicCriticalRate);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerMagicCriticalRate);

        // MagicCriticalNumber
        let instanceSecondaryCaracContainerMagicCriticalNumber = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextMagicCriticalNumber = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextMagicCriticalNumber.innerHTML = "MagicCriticalNumber";
        let instanceSecondaryCaracValueMagicCriticalNumber = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueMagicCriticalNumber.innerHTML = this._card.getMagicCriticalNumber();
        instanceSecondaryCaracContainerMagicCriticalNumber.appendChild(instanceSecondaryCaracTextMagicCriticalNumber);
        instanceSecondaryCaracContainerMagicCriticalNumber.appendChild(instanceSecondaryCaracValueMagicCriticalNumber);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerMagicCriticalNumber);
    
        let instanceBlockSeperateSecondaryData2 = <HTMLElement> templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData2);

        // FireResistance
        let instanceSecondaryCaracContainerFireResistance = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextFireResistance = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextFireResistance.innerHTML = "FireResistance";
        let instanceSecondaryCaracValueFireResistance = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueFireResistance.innerHTML = this._card.getFireResistance();
        instanceSecondaryCaracContainerFireResistance.appendChild(instanceSecondaryCaracTextFireResistance);
        instanceSecondaryCaracContainerFireResistance.appendChild(instanceSecondaryCaracValueFireResistance);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerFireResistance);

        // WaterResistance
        let instanceSecondaryCaracContainerWaterResistance = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextWaterResistance = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextWaterResistance.innerHTML = "WaterResistance";
        let instanceSecondaryCaracValueWaterResistance = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueWaterResistance.innerHTML = this._card.getWaterResistance();
        instanceSecondaryCaracContainerWaterResistance.appendChild(instanceSecondaryCaracTextWaterResistance);
        instanceSecondaryCaracContainerWaterResistance.appendChild(instanceSecondaryCaracValueWaterResistance);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerWaterResistance);

        // PlantResistance
        let instanceSecondaryCaracContainerPlantResistance = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextPlantResistance = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextPlantResistance.innerHTML = "PlantResistance";
        let instanceSecondaryCaracValuePlantResistance = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValuePlantResistance.innerHTML = this._card.getPlantResistance();
        instanceSecondaryCaracContainerPlantResistance.appendChild(instanceSecondaryCaracTextPlantResistance);
        instanceSecondaryCaracContainerPlantResistance.appendChild(instanceSecondaryCaracValuePlantResistance);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerPlantResistance);

        // NecromancyResistance
        let instanceSecondaryCaracContainerNecromancyResistance = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextNecromancyResistance = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextNecromancyResistance.innerHTML = "NecromancyResistance";
        let instanceSecondaryCaracValueNecromancyResistance = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueNecromancyResistance.innerHTML = this._card.getNecromancyResistance();
        instanceSecondaryCaracContainerNecromancyResistance.appendChild(instanceSecondaryCaracTextNecromancyResistance);
        instanceSecondaryCaracContainerNecromancyResistance.appendChild(instanceSecondaryCaracValueNecromancyResistance);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerNecromancyResistance);

        // BlessingResistance
        let instanceSecondaryCaracContainerBlessingResistance = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextBlessingResistance = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextBlessingResistance.innerHTML = "BlessingResistance";
        let instanceSecondaryCaracValueBlessingResistance = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueBlessingResistance.innerHTML = this._card.getBlessingResistance();
        instanceSecondaryCaracContainerBlessingResistance.appendChild(instanceSecondaryCaracTextBlessingResistance);
        instanceSecondaryCaracContainerBlessingResistance.appendChild(instanceSecondaryCaracValueBlessingResistance);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerBlessingResistance);

        // Armor
        let instanceSecondaryCaracContainerArmor = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextArmor = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextArmor.innerHTML = "Armor";
        let instanceSecondaryCaracValueArmor = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueArmor.innerHTML = this._card.getArmor();
        instanceSecondaryCaracContainerArmor.appendChild(instanceSecondaryCaracTextArmor);
        instanceSecondaryCaracContainerArmor.appendChild(instanceSecondaryCaracValueArmor);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerArmor);1

        let instanceBlockSeperateSecondaryData3 = <HTMLElement> templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData3);
    
        // Accuracy
        let instanceSecondaryCaracContainerAccuracy = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextAccuracy = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextAccuracy.innerHTML = "Accuracy";
        let instanceSecondaryCaracValueAccuracy = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueAccuracy.innerHTML = this._card.getAccuracy();
        instanceSecondaryCaracContainerAccuracy.appendChild(instanceSecondaryCaracTextAccuracy);
        instanceSecondaryCaracContainerAccuracy.appendChild(instanceSecondaryCaracValueAccuracy);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerAccuracy);

        // Escape
        let instanceSecondaryCaracContainerEscape = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextEscape = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextEscape.innerHTML = "Escape";
        let instanceSecondaryCaracValueEscape = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueEscape.innerHTML = this._card.getEscape();
        instanceSecondaryCaracContainerEscape.appendChild(instanceSecondaryCaracTextEscape);
        instanceSecondaryCaracContainerEscape.appendChild(instanceSecondaryCaracValueEscape);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerEscape);
    
        let instanceBlockSeperateSecondaryData4 = <HTMLElement> templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData4);

        // Life
        let instanceSecondaryCaracContainerLife = <HTMLElement> templateSecondaryCaracContainer.cloneNode(true);
        let instanceSecondaryCaracTextLife = <HTMLElement> templateSecondaryCaracText.cloneNode(true);
        instanceSecondaryCaracTextLife.innerHTML = "Life";
        let instanceSecondaryCaracValueLife = <HTMLElement> templateSecondaryCaracValue.cloneNode(true);
        instanceSecondaryCaracValueLife.innerHTML = this._card.getLife();
        instanceSecondaryCaracContainerLife.appendChild(instanceSecondaryCaracTextLife);
        instanceSecondaryCaracContainerLife.appendChild(instanceSecondaryCaracValueLife);
        instanceContainerSecondaryData.appendChild(instanceSecondaryCaracContainerLife);

        this._card.getCapacities().forEach((capacity: AbstractCapacity) => {
            let capacityContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            capacityContainer.appendChild(capacity.getGraphic());
            instanceContainerCapacities.appendChild(capacityContainer);
        });
    }
}
customElements.define('card-preview', CardPreviewGraphicComponent);
export default CardPreviewGraphicComponent;