import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';
import fetch from 'isomorphic-fetch';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.state = {current: [], show_current: false,
            markers : []};
        this.getLocation = this.getLocation.bind(this);
    }
    
    componentDidMount() {
        //TODO request results
        this.setState({markers : [{latitude: 37.9763, longitude:23.79763, id:0, price: 17, name: 'CAVA_0'}, 
                    {latitude: 37.9738, longitude:23.7275, id:1, price: 21, name: 'CAVA_1'}]});
    }
    
    getLocation ()  {
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
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
                        '38.032836' + ',' + '23.744472' +
                        '&key=' + 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson.results[0].formatted_address);
                });
            }
        }
    }
    
    render() {
        return (
            <div>
                <label> Εμφάνιση Τωρινής Τοποθεσίας</label>
                <input type="checkbox" name="location" onChange={() => this.getLocation()}></input>
                <Map 
                    google={this.props.google}
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
                        onClick={() => this.info(marker.id)}
                        labelStyle={{color: '#fff'}}
                        icon ={'https://img.icons8.com/color/48/000000/speech-bubble.png'}
                    />
                    ))}
                    {this.state.current.map(marker => (
                        this.state.show_current
                        ? <Marker
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            key={0} icon={'https://www.robotwoods.com/dev/misc/bluecircle.png'}
                        >
                        </Marker>
                        : <div/>
                        ))}
                    
                </Map>
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0'
})(MapClass);