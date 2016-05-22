var app = angular.module('myApp', []);
app.controller('barCtrl', function($scope){ 
  //$scope.allMap = function(){
    $scope.bars = [
        {
            title: "Bierhaus",
            order: "Kaffel Kölsch",
            koordinat: {lat: 59.340164, lng: 18.061868}
        },
            {
            title: "The Capital",
            order: "Cosmopolitan",
            koordinat: {lat: 59.340164, lng: 18.061868}
        },
        {
            title: "Komendören",
            order: "Lemonade",
            koordinat: {lat: 59.339195, lng: 18.077564}
        }
    ];
    $scope.responses = new Array();
    $scope.distances = new Array();
    $scope.directionsService = new google.maps.DirectionsService;
    $scope.directionsDisplay = new google.maps.DirectionsRenderer;     
    var mapOptions = {
      center: {lat: 59.329324, lng: 18.068581},
      zoom: 10,
      tilt: 45,
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.directionsDisplay.setMap($scope.map);


    $scope.calculateRoute = function(directionsService, directionsDisplay,pos){ 
        for (var i=0; i<$scope.bars.length; i++) {
            console.log(i)
            console.log($scope.bars[i].title, $scope.bars[i].koordinat)
             
          directionsService.route({
            origin: pos,
            destination: $scope.bars[i].koordinat,
            travelMode: google.maps.TravelMode.WALKING
          }, function(response, status) {
                console.log("hej hej")
                if (status === google.maps.DirectionsStatus.OK) {
                  $scope.distances.push(response.routes[0].legs[0].distance.value);
                  $scope.responses.push(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
                        
                if (i==$scope.distances.length){
                    console.log($scope.distances)
                    $scope.shortestDist = Math.min.apply(Math,$scope.distances);
                    console.log($scope.responses)
                    for (i in $scope.responses){
                        if ($scope.responses[i].routes[0].legs[0].distance.value == $scope.shortestDist){
                            directionsDisplay.setDirections($scope.responses[i]);
                            $scope.closestResp = $scope.responses[i];
                            
                        }
                    }
                }
                if ($scope.closestResp){
                  $scope.displayRoute($scope.closestResp);
              }
            });
        }
        console.log("shortestDist", $scope.shortestDist)
    }

    $scope.displayRoute = function(closestResp){ 
      console.log(closestResp)
      for (i in $scope.bars){
        if ($scope.bars[i].koordinat == closestResp.request.destination){
          console.log($scope.bars[i].title)
          console.log(closestResp.routes[0].legs[0].distance.text)
          document.getElementById("bardist").innerHTML = closestResp.routes[0].legs[0].distance.text;
          document.getElementById("barnamn").innerHTML = $scope.bars[i].title;
          document.getElementById("barorder").innerHTML = "Order: " + $scope.bars[i].order;
        }
      } 
      console.log($scope.bars)
    }


    $scope.getloc = function(){
        if (navigator.geolocation) {
            console.log("hämtar location")
            navigator.geolocation.getCurrentPosition(function(position) {
            $scope.pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
            console.log($scope.pos)
            $scope.calculateRoute($scope.directionsService, $scope.directionsDisplay,$scope.pos)
            });

        }
    }

    $scope.getloc();
//};

});