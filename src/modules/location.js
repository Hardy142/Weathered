// Exports
module.exports = {

    // Function To Get Coordinates Using Search Term
    getCoord:function(searchTerm){

        return new Promise(function(res,rej){

            // Instanciating New Geocoder Object
            var geocoder = new google.maps.Geocoder();

            // Gets Coordinates of User's Seach Term
            geocoder.geocode({address: searchTerm}, function(result){
                
                res({
                    lat: result[0].geometry.bounds.Ya.j,
                    long: result[0].geometry.bounds.Ua.j
                });

            });
        });

    },
    // Function To Get User's Current Coordinates
    getCurrentUserLocation: function(){
        
        return new Promise(function(res, rej){

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(setUserPosition);

                function setUserPosition(position) {
    
                    res({
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    });
                    
                }

            } else {
                console.log("Geolocation is not supported by this browser.");
            }

        });

    }
}