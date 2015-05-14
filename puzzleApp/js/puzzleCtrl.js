/*
 * Controller for puzzle app.
 */
puzzleApp.controller('puzzleController', ['$scope', '$rootScope', 'puzzleAppSrv', 
  function($scope, $rootScope, puzzleAppSrv) {

    BaseCtrl.call(this, $scope); // Call base controller for global methods.

    // initializing..
    $scope.init = function(){

    	$scope.questionArray = [];
	    $scope.activeQuestionIndex = 0;
	    $scope.score = 0;
	    $scope.showReport = false;
	    $scope.totalQuestions = 0;
	    $scope.scoreForSingleAns = 1;

		var successCallBackFetchData = function(data){
			$scope.questionArray = data;
			$scope.totalQuestions = data.length;
		};
		var failureCallBackFetchData = function(error){
			console.log(error);
		};
		$scope.invokeApi(puzzleAppSrv.fetchData, {}, successCallBackFetchData, failureCallBackFetchData);
	};

	// Utility method to map key to options of answer
	$scope.getOption = function(key){
		var options = ['A','B','C','D'];
		return options[key];
	};

	// Handle option selection
	// 'selectedAnsKey' will be a boolean ranging 0-3.
	$scope.selectedOption = function(selectedAnsKey){

		if($scope.questionArray.length > $scope.activeQuestionIndex){

			var rightAnswerKey = $scope.questionArray[$scope.activeQuestionIndex].answer;
			$scope.questionArray[$scope.activeQuestionIndex].selectedOption = $scope.getOption(selectedAnsKey);
			$scope.questionArray[$scope.activeQuestionIndex].rightAnswer = $scope.getOption(rightAnswerKey);
			 
			// Right answer hadle here..
			if(rightAnswerKey == selectedAnsKey){
				console.log("Correct Ans :" + selectedAnsKey);
				$scope.questionArray[$scope.activeQuestionIndex].score = 1;
				$scope.score ++ ;
			}
			else{ //Wrong answer handle here
				$scope.questionArray[$scope.activeQuestionIndex].score = 0;
			}
			
			$scope.activeQuestionIndex ++ ;

			// Checking if reached final question , if reached show the report
			if($scope.questionArray.length === $scope.activeQuestionIndex){
				$scope.showResult();
			}
		}
	};

	// To show the report screen
	$scope.showResult = function(){
		$scope.showReport = true;
	};

	// Try again button click , reset app.
	$scope.tryAgain = function(){
		$scope.init();
	};

	$scope.init();
    
}]);