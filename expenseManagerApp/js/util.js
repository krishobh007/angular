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

var CurrencyInfoMappings = {
	'dollar' 	: ['$'],
	'rupee'	 	: ['\u20B9'],
	'euro' 		: ['€']
};

var getCurrencySign = function(currencyCode) {
    return CurrencyInfoMappings[currencyCode][0];
};


