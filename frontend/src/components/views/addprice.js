/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import Geocode from 'react-geocode';
import cookie from 'react-cookies';
import {Settings} from './dropdown_settings';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Button, Form, FormGroup, Row, Col, InputGroupAddon, InputGroup } from 'reactstrap';
import ModalExample from './nearby_shops';

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

function getLocation() {
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

class Product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { barcode: '', latitude: '', longitude: '', address: '', post_code: null, addr_num: null, price:null, nearby_shops: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.flag = false;
        this.toggleModal = this.toggleModal.bind(this);
        this.new_product = this.new_product.bind(this);
        this.nearby_shops = this.nearby_shops.bind(this);
    }
    
    nearby_shops () {
        this.setState({nearby_shops: !this.state.nearby_shops});
    }
    
    async currentLocation ()  {
        this.flag = !this.flag;
        var checkBox = document.getElementById("location_price");
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
    
    homepage() {
        browserHistory.push('/search');
    }
    
    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.toggleModal();
        const barcode = document.getElementById('barcode').value;
        const postal = document.getElementById('postal').value;
        const address = document.getElementById('address').value;
        const number = document.getElementById('number').value;
        const price = document.getElementById('price').value;
        const temp = address + ' ' + number + ' ' + postal + ' Greece';

        this.setState(() => ({barcode: barcode, price: price})); 
    }
    
    toggleModal() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    
    new_product () {
        browserHistory.push('/newproduct');
    }
    
    render() {
        return(
            <div>
                <Settings/>
                
                <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
                
                <Form id="addproduct" onSubmit={this.handleSubmit}>
                        <FormGroup check row>
                            <Label sm={3} for="barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                            <Col sm={3}>
                                <Input id="barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Col sm={4}>
                                <Label sm={3} for="location_price"> Τωρινή τοποθεσία</Label>
                                <Input type="checkbox" name="location" id="location_price" onChange={() => this.currentLocation()}></Input>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3}>Ή</Label>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="address">Όνομα Καταστήματος:</Label>
                            <Col sm={3}>
                                <Input id="name" name="name" type="text" disabled={this.flag}/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="address">Διεύθυνση:</Label>
                            <Col sm={3}>
                                <Input id="address" name="address" pattern="[A-Za-z]+" type="text" disabled={this.flag} required/>
                            </Col>
                        </FormGroup>
                        <br/>
                        <FormGroup check inline>
                            <Col sm={2}>
                                <Label for="number">Αριθμός:</Label>
                                <Input id="number" name="number" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                            </Col>
                            
                            <Col sm={2}>
                                <Label for="postal">ΤΚ:</Label>
                                <Input id="postal" name="postal" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="price">Τιμή:</Label>
                            <Col sm={1}>
                                <InputGroup>
                                    <Input type="text" id="price" pattern="[0-9,]+" name="price" required/>
                                    <InputGroupAddon addonType="append">€</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <button className="btn" type="submit" id="button1">Προσθήκη</button>
                        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
                            <ModalBody>Το προϊόν με barcode {this.state.barcode} δε βρέθηκε.</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal}>Διόρθωση Barcode</Button>{' '}
                                <Button color="secondary" onClick={this.homepage}>Ακύρωση</Button>
                                <Button color="secondary" onClick={this.new_product}>Προσθήκη νέου προϊόντος</Button>
                            </ModalFooter>
                        </Modal>
                </Form>
                <Button onClick={() => this.nearby_shops()}> Test nearby shops </Button>
                <ModalExample flag={this.state.nearby_shops}/>
            </div>
        );
  }
}

export default Product;
