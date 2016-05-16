var decisionMakerApp = angular.module('decisionMaker', ['ngRoute','ngResource','ngCookies']);



decisionMakerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'        
      }).
      when('/shakeme', {
        templateUrl: 'partials/shakeme.html',
        controller: 'shakemeCtrl'
      }).
      when('/choice', {
        templateUrl: 'partials/choice.html',
        controller: 'choiceCtrl' 
      }).
      when('/getinspo', {
        templateUrl: 'partials/getinspo.html',
        controller: 'getinspoCtrl' 
      }). 
      when('/recommendation', {
        templateUrl: 'partials/recommendation.html',
        controller: 'recommendationCtrl' 
      }).
      when('/map', {
        templateUrl: 'partials/map.html',
        controller: 'mapCtrl' 
      }).                      
      otherwise({
        redirectTo: '/home'
      });
  }]);