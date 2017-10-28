$(function () {
    var infoWindow = new google.maps.InfoWindow();
    var position = {
        lat: 18.4993387,
        lng: -69.8240669
    };
    var mapOptions = {
        center: position,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    var map = new google.maps.Map(document.getElementById("googleMaps"), mapOptions);
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    var directionsServices = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    var from = document.getElementById("from");
    var to = document.getElementById("to");
    var options = {
        types: ["(cities)"]
    };
    var autoCompleteFrom = new google.maps.places.Autocomplete(from, options);
    var autoCompleteTo = new google.maps.places.Autocomplete(to, options);


    function calculateRoute() {
        
        if($("#from").val() == "" ||  $("#to").val() == ""){
            $("#extraInfo").empty();
            return;
        }
        
        var request = {
            origin: $("#from").val(),
            destination: $("#to").val(),
            travelMode: google.maps.TravelMode.DRIVING, //WALKING,BYCYCLING,TRANSIT
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsServices.route(request, function (result, status) {
            $("#extraInfo").empty();
            
            if (status == google.maps.DirectionsStatus.OK) {

                var div = "<div class='alert-info'>From: " + $("#from").val() + "<br>" + $("#to").val() +
                    "<br><br>Driving distance: " + result.routes["0"].legs["0"].distance.text +
                    "<br><br>Duration: " + result.routes["0"].legs["0"].duration.text + "<div>";



                //            alert(result.routes["0"].legs["0"].distance.text)
                //            alert(result.routes["0"].legs["0"].duration.text);
                directionsDisplay.setDirections(result);
            } else {
                var div = "<div class='alert-danger'>Could not retrieve driving distance.</div>";
                $(div).appendTo($("#extraInfo"));
            }
        });



        //        autoComplete.addListener("place_changed",function(){
        //            console.log(autoComplete.getPlace());
        //            map.panTo(autoComplete.getPlace().geometry.location)
        //        });
        //
    }


    $("#submit").click(function () {
        calculateRoute();
    });

});
