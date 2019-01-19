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
import {Settings} from '../helper_components/dropdown_settings';
import { Navbar, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, 
        ModalFooter, Input, Label, Button, Form, FormGroup, Container, Row, Col, 
        InputGroupAddon, InputGroup, FormFeedback, NavbarBrand, Image, Alert } from 'reactstrap';
import Shops from '../helper_components/nearby_shops';
import { address_to_coords } from '../functions/address_to_coordinates';
import { getLocation } from '../functions/current_location';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';
import {receive_from_server} from '../communication/receive';

class Product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { flag: false, success: null, error: null, current: null, nearby_shops: false, error_address: null, not_found: null, message: null, fail: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.find_barcode = this.find_barcode.bind(this);
        this.find_shop = this.find_shop.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.new_product = this.new_product.bind(this);
        this.nearby_shops = this.nearby_shops.bind(this);
        this.add_price = this.add_price.bind(this);
        this.body = {productId: null, shopId: null, price: null, dateFrom: null, dateTo: null};
    }
    
    nearby_shops () {
        this.refs.nearby_shops.toggle();
    }
    
    async currentLocation ()  {
        this.setState({flag: !this.state.flag});
        var checkBox = document.getElementById("addprice_location");
        if (!checkBox.checked) {
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: { latitude: result[0], longitude: result[1], address: result[2]}, show_current: !temp});
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    async find_barcode () {
        const barcode = document.getElementById('addprice_barcode').value;
        var url = 'http://localhost:3002/products?barcode=' + barcode;
        var answer = await receive_from_server(url);
        if (answer === 'error') {
            this.setState({error: true});
            return false;
        }
        if (answer.status !== 200) {
            this.setState({not_found: true});
            this.setState({message: 'Το προϊόν με barcode ' +  barcode + ' δε βρέθηκε.'});
            return false;
        }
        var details = await answer.json().then((result) => {return result.id;});
        var id = details;
        return id;
    }
    
    async find_shop () {
        const barcode = document.getElementById('addprice_barcode').value;
        var lng = null;
        var lat = null;
        
        var checkBox = document.getElementById("addprice_location");
        
        if (checkBox.checked) {
            lng = this.state.current.longitude;
            lat = this.state.current.latitude;
        }
        else {
            const postal = document.getElementById('addprice_postal').value;
            const address_name = document.getElementById('addprice_address').value;
            const number = document.getElementById('addprice_number').value;
            const total = address_name + ' ' + number + ' ' + postal;
            var result = await address_to_coords(total);
            if (result) {
                lat = result[0];
                lng = result[1];
                this.setState({error_address: false});
            }
            else {
                this.setState({error_address: true});
                return;
            }
        }
        
        var url = 'http://localhost:3002/shops?geoDist=0.1&lat=' + lat + '&lng=' + lng;
        var answer = await receive_from_server(url);
        if (answer === 'error') {
            this.setState({error: true});
            return;
        }
        if (answer.status !== 200) {
            this.setState({not_found: true});
            this.setState({message: 'Δε βρέθηκαν καταστήματα σε αυτή την τοποθεσία'});
            return;
        }
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.refs.nearby_shops.toggle(details);
    }
    
    async add_price (id) {
        this.refs.nearby_shops.close();
        this.body.shopId = id;
        console.log(this.body);
       
        var url = 'http://localhost:3002/prices';
        var answer = await send_to_server(url, this.body);
        
        if (answer === 'error') {
            this.setState({error: true});
            return;
        }
        if (answer.status === 200 || answer.status === 204) {
            this.setState({success: true});
        }
        else {
            this.setState({fail: true});
            return;
        }
        
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({error: false});
        
        var result = await this.find_barcode().then((result) => {return result;});
        if (!result) {
            this.setState({not_found: true});
            this.setState({message: 'Το προϊόν με barcode ' +  document.getElementById('addprice_barcode').value + ' δε βρέθηκε.'});
            return;
        }
        this.body.productId = result;
        
        const price = document.getElementById('addprice_price').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        
        this.body.price = price;
        this.body.dateFrom = dateFrom;
        this.body.dateTo = dateTo;
        console.log(this.body);

        var result = await this.find_shop();        
    }
    
    toggleModal() {
        this.setState({
            isOpen: !this.state.not_found
        });
    }
    
    new_product () {
        browserHistory.push('/newproduct');
    }
    
    render() {
        var curr = new Date();
        curr.setUTCDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        var min_d = new Date();
        min_d.setUTCDate(curr.getDate()-3);
        var min_date = min_d.toISOString().substr(0,10);
        return(
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                
                <Container className="Product">
                <h2 align="center">Εισαγωγή Τιμής</h2>
                <hr></hr>
                <Form id="addproduct" onSubmit={this.handleSubmit}>
                        <FormGroup check row>
                            <Label sm={3} for="addprice_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                            <Col sm={3}>
                                <Input id="addprice_barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                            </Col>
                        </FormGroup>
                        <div className="row mt-3"></div>
                        <FormGroup check>
                        <Label check>
                        <Col sm={9}>
                            <Input type="checkbox" name="location" id="addprice_location" onChange={() => this.currentLocation()}/>      
                        </Col>
                            Τωρινή Τοποθεσία
                        </Label>

                    
                        </FormGroup>    
                        <FormGroup check row>
                            <Label sm={8} for="addprice_name">Όνομα Καταστήματος:</Label>
                            <Col sm={3}>
                                <Input id="addprice_name" name="name" type="text" disabled={this.state.flag}/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="addprice_address">Διεύθυνση:</Label>
                            <Col sm={3}>
                                <Input id="addprice_address" invalid={this.state.error_address} name="address" pattern="[^\u0000-\u007F]+([/\w\.]?[\s]*[^\u0000-\u007F]*)*" type="text" disabled={this.state.flag} required/>
                                <FormFeedback valid={!this.state.error_address}>Η διεύθυνση δεν είναι έγκυρη.</FormFeedback>
                            </Col>
                        </FormGroup>
        
                        <FormGroup check row>
                                <Label sm={3} for="addprice_number">Αριθμός:</Label>
                                <Col sm={1}>
                                    <Input id="addprice_number" invalid={this.state.error_address} name="number" type="text" disabled={this.state.flag} required/>
                            </Col>
                        </FormGroup>
                      
                        <FormGroup check row>
                            <Label sm={3} for="addprice_postal">ΤΚ:</Label>
                                <Col sm={1}>
                                <Input id="addprice_postal" invalid={this.state.error_address} name="postal" pattern="[0-9]+" type="text" disabled={this.state.flag} required/>
                                </Col>
                                </FormGroup>
  
                        <FormGroup check row>
                            <Label sm={3} for="addprice_price">Τιμή:</Label>
                            <Col sm={3}>
                                <InputGroup>
                                    <Input type="text" id="addprice_price" pattern="[0-9]+" name="price" required/>
                                    <InputGroupAddon addonType="append">€</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Label sm={3} for="dateFrom">Ημερομηνία παρατήρησης:</Label>
                            <Col sm={2}>
                                <Input id="dateFrom" type="date" name="dateFrom" defaultValue={date} min={min_date} max={date} required/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="dateTo">Ημερομηνία λήξης τιμής:</Label>
                            <Col sm={2}>
                                <Input id="dateTo" type="date" name="dateTo" min={date}/>
                            </Col>
                        </FormGroup>
                        <hr></hr>
                        <div className="text-center">
                        <Button className="btn" type="submit" id="button1">Προσθήκη</Button>
                        </div>
                </Form>
                </Container>
                <Modal isOpen={this.state.not_found} toggle={this.toggleModal}>
                    <ModalBody> {this.state.message}</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Διόρθωση</Button>{' '}
                        <Button color="secondary" onClick={this.homepage}>Ακύρωση</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.success}>
                    <ModalBody> Η τιμή καταχωρήθηκε επιτυχώς.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.homepage}>Αρχική Σελίδα</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.fail} toggle={() => this.setState({fail: null})}>
                    <ModalBody> Η καταχώρηση τιμής απέτυχε. </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({fail: null})}>Προσπάθεια ξανά</Button>{' '}
                        <Button color="secondary" onClick={this.homepage}>Ακύρωση</Button>
                    </ModalFooter>
                </Modal>
                
                <Shops ref='nearby_shops' select={this.add_price}/>
            </div>
        );
  }
}

export default Product;
