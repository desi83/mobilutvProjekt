app.controller('shuffleCtrl', function($scope) {
    $scope.coffeBeerBtn = true;
    
//Function for hiding and showing the buttons for coffee and beer
    $scope.inspoChoice = function() {
      $scope.coffeBeerBtn = !$scope.coffeBeerBtn;
    };
});