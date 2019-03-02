import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Input, Label } from 'reactstrap';
import {getLocation} from '../functions/current_location';
import { Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import {receive_from_server} from '../communication/receive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

export class MapClass extends Component {
    constructor(props) {
        super(props);
        this.currentLocation = this.currentLocation.bind(this);
        this.state = {current: [], details: null, show_current: false, product: null, message: null, error_message: null, error: null, not_found: null, 
            success: null, markers : [], activeMarker: null,  showingInfoWindow: false, modal: false};
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle_map = this.toggle_map.bind(this);
        this.request_shop = this.request_shop.bind(this);
        this.request_product = this.request_product.bind(this);
        this._asyncRequest = null;
        this._isMounted = null;
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
        if (this._isMounted) {
            this._isMounted.cancel();
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
        this.setState({ success: null, not_found: null, error: null, message: null, error_message: null });
        const url = '/products/' + this.props.product_id;
        this._isMounted = await receive_from_server(url);
        const answer = this._isMounted;
        
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Not Found', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Not Authorized', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Forbidden', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Bad Request', not_found: true});
                return;
            }
            else {
                this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.setState({product: details});
        return details;
    }
    
    async request_shop() {
        this.setState({ success: null, not_found: null, error: null, message: null, error_message: null });
        const url = '/shops/' + this.props.shop_id;
        this._isMounted = await receive_from_server(url);
        const answer = this._isMounted;
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Not Found', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Not Authorized', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Forbidden', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Bad Request', not_found: true});
                return;
            }
            else {
                this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.setState({markers: [details]});
        return details;
    }
    
    async currentLocation ()  {
        var checkBox = document.getElementById("location_map");
        var temp;
        if (!checkBox.checked) {
            temp = this.state.show_current;
            this.setState({ show_current: !temp});
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        temp = this.state.show_current;
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
