/*
 * Service for puzzle app.
 */
puzzleApp.service('puzzleAppSrv',['$http', '$q', 'BaseWebSrv', function($http, $q, BaseWebSrv){
   	
   	// To fetch data from webservice
   	this.fetchData = function(data){
		var deferred = $q.defer();	
		var url ='https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';
		BaseWebSrv.getJSON(url).then(function(data) {
		   	deferred.resolve(data);
		},function(data){
		    deferred.reject(data);
		});	
		return deferred.promise;
	};

}]);