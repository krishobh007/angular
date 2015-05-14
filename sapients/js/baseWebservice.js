sapientApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('sharedHttpInterceptor');
});

sapientApp.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

sapientApp.service('BaseWebSrv',['$http', '$q', '$window', function($http, $q, $window){

    /**
    *   A http requester method for calling webservice
    *   @param {function} function of the method to call like $http.get, $http.put..
    *   @param {string} webservice url
    *   @param {Object} data for webservice
    *   @return {promise}
    */
  this.callWebService = function(httpMethod, url, params, data){
    var deferred = $q.defer();
    if(typeof params == "undefined"){
      params = "";
    }

    //Sample params {params:{fname: "fname", lname: "lname"}}
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
        deferred.resolve(response)
    }).error(function(errors, status) {
      
      if(status == 406){ // 406- Network error
        deferred.reject(errors);
      }
      else if(status == 500){ // 500- Internal Server Error
        deferred.reject(['Internal server error occured']);
      }else{
        deferred.reject(errors);
      }

    });
    return deferred.promise;
  };

    this.getJSON = function(url, params) {
      return this.callWebService("GET", url, params);
    };


}]);

// Defining the service function..
sapientApp.service('sapientSrv',['$http', '$q', 'BaseWebSrv', function($http, $q, BaseWebSrvV2){
   
  
  this.fetch = function(){
    var deferred = $q.defer();
    var url = 'JSON/carousel-data.json';
    BaseWebSrv.getJSON(url).then(function(data) {
         deferred.resolve(data);
    },function(data){
        deferred.reject(data);
    }); 

    return deferred.promise;
  };
  
   
}]);