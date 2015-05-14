/*
 * creating the directive for option button as re-usable component
 */
puzzleApp.directive('optionButton', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<button ng-click="optionClick()">{{text}}</button>',
        scope: {
            'optionClick':   '&',
            'text'		 :   '@'
        }
    };
});



