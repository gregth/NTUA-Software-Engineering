import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';

function coords_to_address (lat, long) {
  return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
              JSON.stringify(lat) + ',' + JSON.stringify(long) +
              '&key=' + 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0')
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.status === 'OK') {
            return responseJson.results[0].formatted_address;
        }
        else {
            return 'not found';
        }
    });
}

function getCurrentPositionPromise() {
    const location = window.navigator && window.navigator.geolocation;
    return new Promise(function(resolve, reject) {
        location.getCurrentPosition(resolve, reject);
    });
}

export function getLocation() {
  return getCurrentPositionPromise()
    .then(async (position) => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        let address = await coords_to_address(lat, long);
        console.log(address);
        return [position.coords.latitude, position.coords.longitude, address];
    })
    .catch((error) => {
          console.log(error);
    });
}
