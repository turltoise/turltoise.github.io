class Container {
    private _c: Map<string, any>;

    constructor() {
        this._c = new Map();
    }

    add(object :any, key=object.constructor.name) {
        this._c.set(key, object);
    }

    get(key: string) {
        if (this._c.has(key)) {
            const object = this._c.get(key);
            if (object == null) {
                console.warn(key + " is null.");
            } 
            return object;
        } else {
            console.warn(key + " doesn't exist in container!");
        }
    }
}
export default Container;