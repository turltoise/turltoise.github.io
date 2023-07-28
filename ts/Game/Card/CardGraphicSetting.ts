class CardGraphicSetting {
	constructor(
		public _maxSpriteDie1: number     | null = null,
        public _maxSpriteStand: number    | null = null,
        public _maxSpriteHit1: number     | null = null,
        public _maxSpriteAttack1: number  | null = null,

        public _xSprite: string  | null = null,
        public _ySprite: string  | null = null,
    )
    {}
}
export default CardGraphicSetting;