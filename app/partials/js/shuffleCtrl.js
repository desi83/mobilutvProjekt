app.controller('shuffleCtrl', function($scope) {
    $scope.showChoices = true;
    
//Function for hiding and showing the buttons for coffee and beer
    $scope.inspoChoice = function() {
      $scope.showChoices = !$scope.showChoices;
    };
});