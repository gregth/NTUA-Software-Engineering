/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0");

export function address_to_coords (address) {
    return Geocode.fromAddress(address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            const address = response.results[0].formatted_address;
            return [lat, lng, address];
        },
        error => {
            console.error(error);
        }
    );
}

