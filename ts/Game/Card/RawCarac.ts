class RawCarac {
	constructor(
		public _rawStrength: number | null = null,
		public _rawDexterity: number | null = null,
		public _rawIntelligence: number | null = null,
		public _rawLuck: number | null = null,
		public _rawPhysicalDamage: number | null = null,
		public _rawPhysicalCriticalRate: number | null = null,
		public _rawPhysicalCriticalNumber: number | null = null,
		public _rawMagicDamage: number | null = null,
		public _rawMagicCriticalRate: number | null = null,
		public _rawMagicCriticalNumber: number | null = null,
		public _rawFireResistance: number | null = null,
		public _rawWaterResistance: number | null = null,
		public _rawPlantResistance: number | null = null,
		public _rawNecromancyResistance: number | null = null,
		public _rawBlessingResistance: number | null = null,
		public _rawArmor: number | null = null,
		public _rawAccuracy: number | null = null,
		public _rawEscape: number | null = null,
		public _rawLife: number | null = null
	) {}
}

export default RawCarac;