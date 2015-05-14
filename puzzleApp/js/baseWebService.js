/*
 * Definig base webservice to handle differnt http requests generically
 * Handling GET,POST,PUT,DELETE
 */

puzzleApp.service('BaseWebSrv',['$http', '$q', '$window', function($http, $q, $window){

    /**
    *   A http requester method for calling webservice
    *   @param {function} function of the method to call like $http.get, $http.put..
    *   @param {string} webservice url
    *   @param {Object} data for webservice
    *   @return {promise}
    */

	this.callWebService = function(httpMethod, url, params){
		var deferred = $q.defer();
		if(typeof params == "undefined"){
			params = "";
		}

		var httpDict = {};
 		httpDict.url = url;
 		httpDict.method = httpMethod;

 		if(httpMethod == 'GET' || httpMethod == 'DELETE'){
 			httpDict.params = params;
 		}
 		else if(httpMethod == 'POST' || httpMethod == 'PUT'){
 			httpDict.data = params;
  		};

		
		$http(httpDict).success(function(response, status) {
			
		    deferred.resolve(response);
			
		}).error(function(response, status) {
			
			deferred.reject(response.errors);
		});
		return deferred.promise;
	};

   	this.getJSON = function(url, params){
    	return this.callWebService("GET", url, params);
   	};

   	this.putJSON = function(url, params){
   		return this.callWebService("PUT", url, params);
   	};

   	this.postJSON = function(url, params){
   		return this.callWebService("POST", url, params);
   	};

   	this.deleteJSON = function(url, params){
   		return this.callWebService("DELETE", url, params);
   	};

}]);
