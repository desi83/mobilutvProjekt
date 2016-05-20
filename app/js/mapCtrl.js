app.controller('mapCtrl', function($scope){ 
  $scope.allMap = function(){
    $scope.cafes = [
        {
            title: "Café Saturnus",
            order: "Latte and cinnamon bun",
            koordinat: {lat: 59.339491, lng: 18.068747}
        },
            {
            title: "Sturekatten",
            order: "Coffee and apple pie",
            koordinat: {lat: 59.334771, lng: 18.074969}
        },
        {
            title: "Kaffeverket",
            order: "Machalatte and chia pudding",
            koordinat: {lat: 59.341405, lng: 18.038072}
        }
    ];
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
        for (var i=0; i<$scope.cafes.length; i++) {
            console.log(i)
            console.log($scope.cafes[i].title, $scope.cafes[i].koordinat)
             
          directionsService.route({
            origin: pos,
            destination: $scope.cafes[i].koordinat,
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
      for (i in $scope.cafes){
        if ($scope.cafes[i].koordinat == closestResp.request.destination){
          console.log($scope.cafes[i].title)
          console.log(closestResp.routes[0].legs[0].distance.text)
          document.getElementById("dist").innerHTML = closestResp.routes[0].legs[0].distance.text;
          document.getElementById("namn").innerHTML = $scope.cafes[i].title;
          document.getElementById("order").innerHTML = "Order: " + $scope.cafes[i].order;
        }
      } 
      console.log($scope.cafes)
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
};

});