function BaseCtrl($scope){
	

	$scope.fetchedCompleted = function(data){
		// Handle succss case
	};
	
	$scope.fetchedFailed = function(error){
		// Handle error case
	};

	// Handle API call
	$scope.invokeApi = function(serviceApi, params, successCallback, failureCallback, loaderType){
		
		successCallback = (typeof successCallback ==='undefined') ? $scope.fetchedCompleted : successCallback;
		failureCallback = (typeof failureCallback ==='undefined') ? $scope.fetchedFailed : failureCallback;
		
		return serviceApi(params).then(successCallback, failureCallback);
		
	};


}