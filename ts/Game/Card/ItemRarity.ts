class ItemRarity {
    private _colorList: Map<string, string>;
    private _nameList: Map<string, string>;

    constructor() {
        this._colorList = new Map();
        this.#generateColor();
        this._nameList = new Map();
        this.#generateName();
    }

    getName(id:string): string {
        return this._nameList.get(id);
    }

    getColor(id:string): string {
        return this._colorList.get(id);
    }
    
    #generateColor() {
        this._colorList.set(ItemRarity.POOR(), '#9d9d9d');
        this._colorList.set(ItemRarity.COMMON(), 'white');
        this._colorList.set(ItemRarity.UNCOMMON(), '#1eff00');
        this._colorList.set(ItemRarity.RARE(), '#0cf');//'#0070dd');
        this._colorList.set(ItemRarity.EPIC(), '#a335ee');
        this._colorList.set(ItemRarity.LEGENDARY(), '#ff8000');
        this._colorList.set(ItemRarity.ARTIFACT(), '#e5cc80'); 
    }

    #generateName() {
        this._nameList.set(ItemRarity.POOR(), 'Poor');
        this._nameList.set(ItemRarity.COMMON(), 'Common');
        this._nameList.set(ItemRarity.UNCOMMON(), 'Uncommon');
        this._nameList.set(ItemRarity.RARE(), 'Rare');
        this._nameList.set(ItemRarity.EPIC(), 'Epic');
        this._nameList.set(ItemRarity.LEGENDARY(), 'Legendary');
        this._nameList.set(ItemRarity.ARTIFACT(), 'Artifact');
    }
    
    rollRarity(): string {
        let roll:number = Math.floor(Math.random() * 100) + 1
        return this.#computeRate(roll);
    }

    #computeRate(roll: number): string {
        switch(true) {
            case (roll == 1):
                return ItemRarity.ARTIFACT();
            case (roll < 6):
                return ItemRarity.LEGENDARY();
            case (roll < 15):
                return ItemRarity.EPIC()
            case (roll < 31):
                return ItemRarity.RARE();
            case (roll <51):
                return ItemRarity.UNCOMMON();
            case (roll < 91):
                return ItemRarity.COMMON();
            default:
                return ItemRarity.POOR();
        }
    }

    static POOR(): string {return 'poor';}
    static COMMON(): string {return 'common';}
    static UNCOMMON(): string {return 'uncommon';}
    static RARE(): string {return 'rare';}
    static EPIC(): string {return 'epic';}
    static LEGENDARY(): string {return 'legendary';}
    static ARTIFACT(): string {return 'artifact';}
}
export default  ItemRarity;