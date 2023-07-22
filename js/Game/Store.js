// TO DO - TO REWORK
class Store {
    constructor() {
        //super();
    }
    save() {
        /*console.info("Saving ....");
        console.debug(this._state);
        this._state._document = null;
        this._state._currentScript = null;
        localStorage.setItem('pirate-save', JSON.stringify(this._state));*/
    }
    delete() {
    }
    deleteSave() {
        /*console.info("Deleting ....");
        console.debug(this._state);
        localStorage.removeItem('pirate-save');*/
    }
    load() {
        /*console.info("Loading ....");
        var stateSaved = localStorage.getItem('pirate-save');
    
        if (null != stateSaved) {
            console.debug(stateSaved);
            console.log(this._state);
            this._state = this._state.hydrateObject(stateSaved, '_state');
            this._state._document = document;
            this._state._currentScript = document.currentScript;
            console.debug(this._state);
        } else {
            console.warn("No save found");
        }*/
    }
}
export default Store;
//# sourceMappingURL=Store.js.map