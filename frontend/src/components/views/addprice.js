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
import {  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Button, Form, FormGroup, Row, Col } from 'reactstrap';

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
        this.state = { barcode: '', latitude: '', longitude: '', address: '', post_code: null, addr_num: null, price:null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.flag = false;
        this.toggleModal = this.toggleModal.bind(this);
        this.new_product = this.new_product.bind(this);
    }
    
    async currentLocation ()  {
        this.flag = !this.flag;
        var checkBox = document.getElementById("location");
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
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" check inline>
                            <Label for="name" className="mr-sm-2">Barcode Προϊόντος:</Label>
                            <Input id="barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                        </FormGroup>
                        <FormGroup check inline>
                            <Input type="checkbox" name="location" id="location" onChange={() => this.currentLocation()}></Input>
                            <Label> Τωρινή τοποθεσία</Label> 
                        </FormGroup>
                        <div> Ή </div>
                        <FormGroup className="login" check inline>
                            <Label for="address">Όνομα Καταστήματος:</Label>
                            <Input id="name" name="name" type="text" disabled={this.flag}/>
                        </FormGroup>
                        
                        <FormGroup className="login" check inline>
                            <Label for="address">Διεύθυνση:</Label>
                            <Input id="address" name="address" pattern="[A-Za-z]+" type="text" disabled={this.flag} required/>
                        </FormGroup>
                        <Row form>
                        <Col md={6}>
                        <FormGroup className="login" check inline>
                            <Label for="number">Αριθμός:</Label>
                            <Input type="text" id="number" disabled={this.flag} className="form_input" required/>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup className="login" check inline>
                            <Label for="postal">ΤΚ:</Label>
                            <Input id="postal" name="postal" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                        </FormGroup>
                        </Col>
                        </Row>
                        <FormGroup check inline>
                            <Label for="price">Τιμή:</Label>
                            <Input type="text" id="price" pattern="[0-9,]+" name="price" required/> {' '}€
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
            </div>
        );
  }
}

export default Product;
