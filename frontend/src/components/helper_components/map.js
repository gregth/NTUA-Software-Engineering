import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';
import { Input, Label } from 'reactstrap';
import {getLocation} from '../functions/current_location';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Container } from 'reactstrap';

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.currentLocation = this.currentLocation.bind(this);
        this.state = {current: [], show_current: false,
            markers : this.props.shops, activeMarker: {},  showingInfoWindow: false, modal: false};
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.info = this.info.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {
        //TODO request results
        if (this.props.shops === null) {
            this.setState({markers : [{lat: 37.9763, lng:23.79763, id:0, price: 17, name: 'CAVA_0'}, 
                    {lat: 37.9738, lng:23.7275, id:1, price: 21, name: 'CAVA_1'}]});
        }
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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
        this.setState({ current: [{lat: result[0], lng: result[1]}], show_current: !temp});
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
                <Button color="primary" onClick={this.toggle}>Εμφάνιση αποτελεσμάτων στον χάρτη</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
                    <ModalHeader toggle={this.toggle}>
                        <Label check>
                            Εμφάνιση Τωρινής Τοποθεσίας
                            <Input type="checkbox" id="location_map" onChange={() => this.currentLocation()}/>{' '}
                        </Label>
                    </ModalHeader>
                    <ModalBody>
                    <Container className="modal_big">
                        <Map       
                            google={this.props.google}
                            zoom={11}
                            coordinates={true}
                            initialCenter={{
                                lat: 37.9838,
                                lng: 23.7275
                            }}>
                            {this.state.markers.map(marker => (
                            <Marker
                                className='marker'
                                position={{ lat: marker.lat, lng: marker.lng }}
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
                                this.state.show_current && this.state.shops
                                ? <Marker
                                    position={{ lat: marker.lat, lng: marker.lng }}
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
                        </Container>
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0'
})(MapClass);