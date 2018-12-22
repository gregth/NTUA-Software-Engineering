import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.state = {current: [{latitude: 11 , longitude: 11}], show_current: false,
            markers : [{latitude: 37.9763, longitude:23.79763, id:1}, {latitude: 37.9738, longitude:23.7275, id:2}]};
        this.getLocation = this.getLocation.bind(this);
        this.lat = null;
    }
    
    getLocation()  {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    current : [{latitude: position.coords.latitude, longitude: position.coords.longitude}]
                });
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
            });
            var temp = this.state.show_current;
            this.setState({ show_current: !temp});
        }
    }
  
    render() {
        return (
            <div>
                <label> Εμφάνιση Τωρινής Τοποθεσίας</label>
                <input type="checkbox" name="location" onChange={() => this.getLocation()}></input>
                <Map 
                    google={this.props.google}
                    zoom={10}
                    coordinates={true}
                    className='map'
                    initialCenter={{
                        lat: 37.9838,
                        lng: 23.7275
                    }}>
                    {this.state.markers.map(marker => (
                    <Marker
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                        key={marker.id}
                    />
                    ))}
                    {this.state.current.map(marker => (
                        this.state.show_current
                        ? <Marker
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            key={0} icon={'https://www.robotwoods.com/dev/misc/bluecircle.png'}
                        />
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