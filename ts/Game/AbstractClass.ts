class AbstractClass {
	/*
	// structName : classname with underscore before
	hydrateObject(myStruct, myStructName = '_state') {

		console.log(myStruct, myStructName);
		if (this.isJsonString(myStruct)) {
			console.log("IS JSON");
			myStruct = JSON.parse(myStruct);
			for (var propertyName in myStruct) {
				var attributValue = null;
				if (myStruct[propertyName] instanceof Object && Object.getPrototypeOf(myStruct[propertyName]) == Object.prototype) {
					var subObject = this.hydrateObject(myStruct[propertyName], propertyName);
					attributValue = subObject;
					
				} else {
					attributValue = myStruct[propertyName];
				}
				myStruct[propertyName] = attributValue;
			}
			
			var myStructName = this.capitalizeFirstLetter(myStructName);
			var myObject = eval(`new ${myStructName}()`);
console.log(`new ${myStructName}()`);
			for (var propertyName in myStruct) {
				myObject[propertyName] = myStruct[propertyName];
			}
		} else {
			console.log("IS NOT JSON");
			var myStructName = this.capitalizeFirstLetter(myStructName);
			var myObject = eval(`new ${myStructName}()`);

			for (var propertyName in myStruct) {
				myObject[propertyName] = myStruct[propertyName];
			}
		}
		return myObject;
	}
	
	
	capitalizeFirstLetter(string) {
		string = string.slice(1); // remove underscore before name
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	isJsonString(string) {
	  try {
	    var json = JSON.parse(string);
	    return (typeof json === 'object');
	  } catch (e) {
	    return false;
	 }
	}*/
}

export default AbstractClass;