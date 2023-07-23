// functions on type
class F {
    // check type attribut
    static c(variable, type) {
        if (variable !== undefined) {
            if (variable.constructor.name != type) {
                console.warn("Variable of type " + variable.constructor.name + " is not type of " + type);
            }
        }
        else {
            console.log("Variable undefined is not type of " + type + " (if we are in a case of a load save, it's normal for now)");
        }
        return variable;
    }
    static sprintf(format, ...args) {
        let i = 0;
        return format.replace(/%s/g, () => args[i++]);
    }
}
export default F;
//# sourceMappingURL=F.js.map