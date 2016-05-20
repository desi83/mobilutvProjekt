var app = angular.module('myApp', []);



decisionMakerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'        
      }).
      when('/helpmedecide', {
        templateUrl: 'partials/helpmedecide.html',
        controller: 'helpmedecideCtrl'
      }).
      when('/result', {
        templateUrl: 'partials/result.html',
        controller: 'resultCtrl' 
      }).
      when('/placeinfo', {
        templateUrl: 'partials/placeinfo.html',
        controller: 'mapCtrl' 
      }). 
      when('/shuffle', {
        templateUrl: 'partials/shuffle.html',
        controller: 'shuffleCtrl' 
      }).
      when('/map', {
        templateUrl: 'partials/map.html',
        controller: 'mapCtrl' 
      }).                      
      otherwise({
        redirectTo: '/home'
      });
  }]);