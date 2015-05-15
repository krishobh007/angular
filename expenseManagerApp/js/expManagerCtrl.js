/*
 * Controller for expManagerApp.
 */
expManagerApp.controller('expManagerController', ['$scope', '$rootScope',
  function($scope, $rootScope) {

  	var expenseId = 0;  // Custom id for each expense details.
    
    $scope.data = {};
    $scope.data.isActiveAddNewFriend = false;

    $scope.data.typeList = [
    	{"value":"card","name":"Card"},
    	{"value":"cash","name":"Cash"},
    	{"value":"other","name":"Other"}
    ];

    $scope.data.friendsList = [ "Andy" , "Sandy" , "Randy" , "Mandy" ];

    $scope.data.currencyList = [
    	{"value":"dollar","name":"USD"},
    	{"value":"rupee","name":"INR"},
    	{"value":"euro","name":"EUR"}
    ];
    
    $scope.data.expenseList = [];

    // Initial data setup , also using for restting.
    var init = function(){
    	$scope.isEditMode = false;
	    $scope.expenseData = {
	    	"id"			: "",
	    	"type"			: "card",    // Setting default type selection.
	    	"friendList" 	: [],
            "friendListStr" : "",
	    	"name"			: "",
	    	"date"			: "",
	    	"currencyCode"	: "dollar", // Setting default currency selection.
	    	"amount"		: "",
            // Default values for table filters.
            "friendListFilter"      : $scope.data.friendsList[0],
            "currencyCodeFilter"    : "dollar"
	    };
	};
    
    // Checking for field validation.
    var validation = function(){

        var isValidationSuccess = false;
        var data = $scope.expenseData;
        if(data.type == "" || data.friendList.length == 0  || data.name == "" || data.date == "" || data.currencyCode == "" || data.amount == ""){
            isValidationSuccess = false;
        }
        else{
            isValidationSuccess = true;
        }
        return isValidationSuccess;
    };

    // To add a new friends name to the friends list.
    $scope.addToFriendList = function(){
        $scope.data.friendsList.push($scope.data.newFriendName);
        $scope.data.newFriendName = "";
    };

    // To add new expense
    $scope.addNewExpense = function(){
        if(validation()){
        	$scope.expenseData.id = expenseId;
            $scope.expenseData.friendListStr = $scope.expenseData.friendList.toString();
        	$scope.data.expenseList.push($scope.expenseData);
        	init(); // Reset the fields.
            expenseId ++;  // incrementing id for next expense.
        }
    };

    // Deleting an expense
    $scope.deleteItem = function(id){
        angular.forEach($scope.data.expenseList,function(item, index) {
            if(item.id == id){
              $scope.data.expenseList.splice(index,1);      
            }
        });
        if($scope.isEditMode){
            init();
            $scope.isEditMode = false;
        } 
    };

    // Editing an expense
    $scope.editItem = function(item){
    	$scope.isEditMode = true;
        $scope.expenseData = dclone(item);
    };

    // Saving the expense after edit.
    $scope.updateExpense = function(id){

        if(validation()){
        	$scope.isEditMode = false;
            $scope.expenseData.friendListStr = $scope.expenseData.friendList.toString();
            var editedItem = dclone($scope.expenseData);
            angular.forEach($scope.data.expenseList,function(item, index) {
                if(item.id == id){
                  $scope.data.expenseList[index] = [];
                  $scope.data.expenseList[index] = editedItem;
                }
            });
            init(); 
        }
    };

    // To get currency codes.
    $scope.getCurrencySymbol = function(currencyCode){
        return getCurrencySign(currencyCode);
    };

    // To hanlde currency code change in the table.
    $scope.currencyCodeChanged = function(){

        var convertTo = $scope.expenseData.currencyCodeFilter;
        var convertFrom = "", amount = "";

        angular.forEach($scope.data.expenseList,function(item, index) {
            convertFrom = item.currencyCode;
            amount = item.amount;
           
            item.currencyCode = convertTo; // update currency symbol
            item.amount = currencyConverter(convertFrom,convertTo,amount); // update amount
        });
    };

    init();

}]);
