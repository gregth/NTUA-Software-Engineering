import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from 'react-geocode';
import { Input, Label } from 'reactstrap';
import {getLocation} from '../functions/current_location';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faWineBottle, faBuilding } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.currentLocation = this.currentLocation.bind(this);
        this.state = {current: [], details: null, show_current: false, product: null,
            markers : [], activeMarker: null,  showingInfoWindow: false, modal: false};
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle_map = this.toggle_map.bind(this);
        this.request_shop = this.request_shop.bind(this);
        this.request_product = this.request_product.bind(this);
        this._asyncRequest = null;
    }
    
    componentDidMount () {        
        this._asyncRequest = this.request_shop().then(
            details => {
                this._asyncRequest = null;
                this.setState({details});
            }
        );
        this._asyncRequest = this.request_product().then(
            details => {
                this._asyncRequest = null;
                this.setState({details});
            }
        );
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    
    toggle () {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    toggle_map (product_id, shop_id, price) {
        this.setState({
            modal: !this.state.modal,
            shop_id: shop_id,
            product_id: product_id,
            price: price
        });
    }
    
    async request_product() {
        const url = 'http://localhost:3002/products/' + this.props.product_id;
        const answer = await receive_from_server(url);
        
        if (answer === 'error') {
            this.setState({error: true});
            return;
        }
        
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({not_found: true});
        }
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.setState({product: details});
        return details;
    }
    
    async request_shop() {
        const url = 'http://localhost:3002/shops/' + this.props.shop_id;
        const answer = await receive_from_server(url);
        
        if (answer === 'error') {
            this.setState({error: true});
            return;
        }
        
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({not_found: true});
        }
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.setState({markers: [details]});
        return details;
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
                <button className="search_btn" id="map_btn" title='Εμφάνιση στον χάρτη' onClick={this.toggle}>
                    <FontAwesomeIcon icon={faMapMarkedAlt}></FontAwesomeIcon>
                </button>
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
                                label={this.props.price.toString() + '€'}
                                info={marker}
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
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    key={3} icon={'https://www.robotwoods.com/dev/misc/bluecircle.png'}
                                >
                                </Marker>
                                : null
                                ))}
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}>
                                    {this.state.activeMarker
                                    ? <div>
                                        <strong>Προϊόν: </strong>
                                        <strong>{this.state.product.name}</strong><br/><br/>
                                        <strong>Κατάστημα:</strong><br/>
                                        <strong>{this.state.activeMarker.info.name} </strong><br/>
                                        {this.state.activeMarker.info.address} <br/>
                                        {this.state.activeMarker.info.phone} <br/>
                                        {this.state.activeMarker.info.withdrawn 
                                        ? <p className='withdrawnShop'> Αποσυρθέν </p>
                                        : <p className='activeShop'> Ενεργό </p>
                                        }
                                    </div>
                                    : <div></div>
                                    }
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
