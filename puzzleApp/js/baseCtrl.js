/*
 * Base controller for global functions..
 */
function BaseCtrl($scope) {

	$scope.fetchedCompleted = function(data){
		// Success call back ..
	};

	$scope.fetchedFailed = function(errorMessage){
		// failure call back ..
		console.log(errorMessage);
	};
	
	// To handle api calls genericaly
	$scope.invokeApi = function(serviceApi, params, successCallback, failureCallback){

		successCallback = (typeof successCallback ==='undefined') ? $scope.fetchedCompleted : successCallback;
		failureCallback = (typeof failureCallback ==='undefined') ? $scope.fetchedFailed : failureCallback;
		
		return serviceApi(params).then(successCallback, failureCallback);
	};
}