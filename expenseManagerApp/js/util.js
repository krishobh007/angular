// Function to remove unwanted key elements from hash and create a deep copy.
var dclone = function(object, unwanted_keys){

    if(typeof unwanted_keys === "undefined"){
        unwanted_keys = [];
    }
    if(object === "undefined"){
        return object;
    } else {
            var newObject = JSON.parse(JSON.stringify(object));
            for(var i=0; i < unwanted_keys.length; i++){
                delete newObject[unwanted_keys[i]];
            }
    }
    return newObject;
};

// Mapping of currency code with symbol
var CurrencyInfoMappings = {
	'dollar' 	: ['$'],
	'rupee'	 	: ['\u20B9'],
	'euro' 		: ['€']
};

// Method for getting currency symbol from the map.
var getCurrencySign = function(currencyCode) {
    return CurrencyInfoMappings[currencyCode][0];
};

// Method for currency conversion.
var currencyConverter = function( from , to ,amount){
	var convertedAmount = 0;
	amount = parseFloat(amount).toFixed(2);
	if(from == "rupee"){
		if(to == "dollar") convertedAmount = amount * 0.016;
		if(to == "euro") convertedAmount = amount * 0.014;
		if(to == "rupee") convertedAmount = amount * 1;
	}
	else if(from == "dollar"){
		if(to == "dollar") convertedAmount = amount * 1;
		if(to == "euro") convertedAmount = amount * 0.88;
		if(to == "rupee") convertedAmount = amount * 63.64;
	}
	else if(from == "euro"){
		if(to == "dollar") convertedAmount = amount * 1.13;
		if(to == "euro") convertedAmount = amount * 1;
		if(to == "rupee") convertedAmount = amount * 72.13;
	}
	return parseFloat(convertedAmount).toFixed(2);
};

