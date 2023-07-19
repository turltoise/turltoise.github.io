import World from "../Adventure/WorldList.js";

class AllWorldProgress {
	private _progressPerWorld: Map<string, { currentLevel: number; maxLevelReach: number; }>;

	constructor() {
		this._progressPerWorld = new Map();
		this.#generateProgressForAllWorld();
	}

	getCurrentLevelForWorld(worldName: string) {
	 	return this.#exists(worldName) ? this._progressPerWorld.get(worldName).currentLevel : 0;
	}

	getMaxLevelReachForWorld(worldName: string) {
	 	return this.#exists(worldName) ? this._progressPerWorld.get(worldName).maxLevelReach : 0;
	}

	incrementCurrentLevelForWorld(worldName: string) {
		let currentWorldProgress = this._progressPerWorld.get(worldName);
		currentWorldProgress.currentLevel = currentWorldProgress.currentLevel+1;
		this._progressPerWorld.set(worldName, currentWorldProgress);
	}

	reduceCurrentLevelForWorld(worldName: string) {
		let currentWorldProgress = this._progressPerWorld.get(worldName);
		currentWorldProgress.currentLevel = currentWorldProgress.currentLevel-1;
		this._progressPerWorld.set(worldName, currentWorldProgress);
	}

	setMaxLevelReachForWorld(worldName: string, maxLevelToSet: number) {
		let currentWorldProgress = this._progressPerWorld.get(worldName);
		currentWorldProgress.maxLevelReach = maxLevelToSet;
		this._progressPerWorld.set(worldName, currentWorldProgress);
	}

	#generateProgressForAllWorld() {
		const self = this;
		World.getListName().forEach(function(className, id) {
			self._progressPerWorld.set(className, self.#createProgressForCurrentWorld());
		});
	}

	#createProgressForCurrentWorld() :{ currentLevel: number; maxLevelReach: number; } {
		return {"currentLevel": 1, "maxLevelReach": 0};
	}

	#exists(worldName: string) {
		return this._progressPerWorld.has(worldName);
	}
}
export default AllWorldProgress;