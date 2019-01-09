import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';
import { Input, Label } from 'reactstrap';
import {getLocation} from './current_location';

export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.currentLocation = this.currentLocation.bind(this);
        this.state = {current: [], show_current: false,
            markers : [], activeMarker: {},  showingInfoWindow: false};
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.info = this.info.bind(this);
    }
    
    componentDidMount() {
        //TODO request results
        this.setState({markers : [{latitude: 37.9763, longitude:23.79763, id:0, price: 17, name: 'CAVA_0'}, 
                    {latitude: 37.9738, longitude:23.7275, id:1, price: 21, name: 'CAVA_1'}]});
    }
    
    async currentLocation ()  {
        
        var checkBox = document.getElementById("location_map");
        
        if (!checkBox.checked) {
            var temp = this.state.show_current;
            this.setState({ show_current: !temp});
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: [{latitude: result[0], longitude: result[1]}], show_current: !temp});
    }
    
    info (id) {
        try {
            return this.state.markers[id].name;
        }
        catch (error){
            return;
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
                <Label>
                    Εμφάνιση Τωρινής Τοποθεσίας
                    <Input type="checkbox" id="location_map" onChange={() => this.currentLocation()}/>{' '}
                    
                </Label>
                
                <Map 
                    google={window.google}
                    style={{width:'40%', height:'40%'}}
                    zoom={11}
                    coordinates={true}
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
                        labelStyle={{color: '#fff'}}
                        icon ={'https://img.icons8.com/color/48/000000/speech-bubble.png'}
                        onClick={this.onMarkerClick}
                        id={marker.id}
                    >
                    </Marker>
                    ))}
                    {this.state.current.map(marker => (
                        this.state.show_current
                        ? <Marker
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            key={3} icon={'https://www.robotwoods.com/dev/misc/bluecircle.png'}
                        >
                        </Marker>
                        : null
                        ))}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                            {this.info(this.state.activeMarker.id)}
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