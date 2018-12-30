import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';
import fetch from 'isomorphic-fetch';

/* global google */
const mapStyles = {
  width: '100%',
  height: '100%'
};

function coords_to_address (lat, long) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
                JSON.stringify(lat) + ',' + JSON.stringify(long) +
                '&key=' + 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0')
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'OK') {
                alert(responseJson.results[0].formatted_address);
                return responseJson.results[0].formatted_address;
            }
            else {
                return 'not found';
            }
        });
    }
    
export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.getLocation = this.getLocation.bind(this);
        this.state = {current: [], show_current: false,
            markers : [], activeMarker: {},  showingInfoWindow: false};
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }
    
    componentDidMount() {
        //TODO request results
        this.setState({markers : [{latitude: 37.9763, longitude:23.79763, id:0, price: 17, name: 'CAVA_0'}, 
                    {latitude: 37.9738, longitude:23.7275, id:1, price: 21, name: 'CAVA_1'}]});
    }

    coords_to_address (lat, long) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
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
    
    getLocation ()  {
        var checkBox = document.getElementById("location");
        if (!checkBox.checked) {
            var temp = this.state.show_current;
            this.setState({ show_current: !temp});
            return;
        }
        
        const location = window.navigator && window.navigator.geolocation;
        
        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    current : [{latitude: position.coords.latitude, longitude: position.coords.longitude}]
                });
            }, (error) => {
                console.log('error current location');
            });
            
            var temp = this.state.show_current;
            this.setState({ show_current: !temp});
            
            if (this.state.current.length > 0) {
                var address = coords_to_address(this.state.current[0].latitude, this.state.current[0].longitude);
                console.log(address);
            }
        }
    }
    
    onMarkerClick (props, marker, e) {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    }
  
    render() {
        return (
            <div>
                <label> Εμφάνιση Τωρινής Τοποθεσίας</label>
                <input type="checkbox" id="location" name="location" onChange={() => this.getLocation()}></input>
                <Map 
                    google={window.google}
                    zoom={11}
                    coordinates={true}
                    className='map'
                    initialCenter={{
                        lat: 37.9838,
                        lng: 23.7275
                    }}>
                    {this.state.markers.map(marker => (
                    <Marker
                        className='marker'
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                        key={marker.id}
                        label={marker.price.toString() + '€'}
                        onClick={this.info}
                        labelStyle={{color: '#fff'}}
                        icon ={'https://img.icons8.com/color/48/000000/speech-bubble.png'}
                        onClick={this.onMarkerClick}
                    >
                    </Marker>
                    ))}
                    {this.state.current.map(marker => (
                        this.state.show_current
                        ? <Marker
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            key={3} icon={'https://www.robotwoods.com/dev/misc/bluecircle.png'}
                            onClick={this.onMarkerClick}
                        >
                        </Marker>
                        : <div/>
                        ))}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1>this.state.activeMarker</h1>
                            </div>
                        </InfoWindow>
                </Map>
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0'
})(MapClass);