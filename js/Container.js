class Container {
    constructor() {
        this._c = new Map();
    }
    add(object, key = object.constructor.name) {
        this._c.set(key, object);
    }
    get(key) {
        if (this._c.has(key)) {
            const object = this._c.get(key);
            if (object == null) {
                console.warn(key + " is null.");
            }
            return object;
        }
        else {
            console.warn(key + " doesn't exist in container!");
        }
    }
}
export default Container;
//# sourceMappingURL=Container.js.map