var numbers = {
	"1000" : {
		"name": "Thousand",
		"abbreviation": "K"
	},
	"1000000" : {
		"name": "Million",
		"abbreviation": "M"
	},
	"1000000000" : {
		"name": "Billion",
		"abbreviation": "B"
	},
	"1000000000000" : {
		"name": "Trillion",
		"abbreviation": "t"
	},
	"1000000000000000" : {
		"name": "Quadrillion",
		"abbreviation": "q"
	},
	"1000000000000000000" : {
		"name": "Quintillion",
		"abbreviation": "Q"
	},
	"1000000000000000000000" : {
		"name": "Sextillion",
		"abbreviation": "s"
	},
	"1000000000000000000000000" : {
		"name": "Septillion",
		"abbreviation": "S"
	},
	"1000000000000000000000000000" : {
		"name": "Octillion",
		"abbreviation": "o"
	},
	"1000000000000000000000000000000" : {
		"name": "Nonillion",
		"abbreviation": "n"
	},
	"1000000000000000000000000000000000" : {
		"name": "Decillion",
		"abbreviation": "d"
	},
	"1000000000000000000000000000000000000" : {
		"name": "Undecillion",
		"abbreviation": "U"
	},
	"1000000000000000000000000000000000000000" : {
		"name": "Duodecillion",
		"abbreviation": "D"
	},
	"1000000000000000000000000000000000000000000" : {
		"name": "Tredecillion",
		"abbreviation": "T"
	},
	"1000000000000000000000000000000000000000000000" : {
		"name": "Quattuordecillion",
		"abbreviation": "Qt"
	},
	"1000000000000000000000000000000000000000000000000" : {
		"name": "Quindecillion",
		"abbreviation": "Qd"
	},
	"1000000000000000000000000000000000000000000000000000" : {
		"name": "Sexdecillion",
		"abbreviation": "Sd"
	}
};

class Number {

	static displayNumber(value)
	{
		var computedValue = this.getNumberInfo(value);
		return '<font title="'+ value.toLocaleString() +'">' + computedValue.computedNumber + '</font> <font title="' + computedValue.name + '">' + computedValue.abbreviation.trim() + '</font>';
	}

	static getNumberInfo(number)
	{
	  var abbreviation = "";
	  var name = "";
	  var unit = "1";

	  for (const [key, value] of Object.entries(numbers)) {
		if (parseFloat(number) < parseFloat(key)) {
		  break;
		} else {
		  unit = key;
		  abbreviation = value.abbreviation;
		  name = value.name;
		}
	  }
	  var computedNumber = number/parseInt(unit);
	  computedNumber = Math.floor(computedNumber * 100) / 100;

	  return {
		name: name,
		number: number,
		abbreviation: abbreviation,
		unit : unit,
		computedNumber: computedNumber
	  };
	}
}

export default Number;