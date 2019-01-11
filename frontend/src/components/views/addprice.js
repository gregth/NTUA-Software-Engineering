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
import { Navbar, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, 
        ModalFooter, Input, Label, Button, Form, FormGroup, Row, Col, 
        InputGroupAddon, InputGroup, FormFeedback, NavbarBrand, Image } from 'reactstrap';
import ModalExample from './nearby_shops';
import { address_to_coords } from './address_to_coordinates';
import { getLocation } from './current_location';
import {send_to_server} from './send';

class Product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { success: null, error: null, current: null, nearby_shops: false, error_address: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.flag = false;
        this.toggleModal = this.toggleModal.bind(this);
        this.new_product = this.new_product.bind(this);
        this.nearby_shops = this.nearby_shops.bind(this);
    }
    
    componentDidMount() {
        try {
            var loggedin = Boolean(cookie.load('loggedin'));
            if (!loggedin) {
                browserHistory.push('/login');
            }
            cookie.save('need_login', true, {path: '/'});
        }
        catch(error) {
            console.log(error);
        }
    }
    
    nearby_shops () {
        this.refs.nearby_shops.toggle();
    }
    
    async currentLocation ()  {
        this.flag = !this.flag;
        var checkBox = document.getElementById("addprice_location");
        if (!checkBox.checked) {
            var temp = this.state.show_current;
            this.setState({ show_current: !temp});
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: { latitude: result[0], longitude: result[1], address: result[2]}, show_current: !temp});
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const barcode = document.getElementById('addprice_barcode').value;
        const price = document.getElementById('addprice_price').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        var name = null;
        var lng = null;
        var lat = null;
        var address = null;
        
        var checkBox = document.getElementById("addprice_location");
        
        if (checkBox.checked) {
            lng = this.state.current.longitude;
            lat = this.state.current.latitude;
            address = this.state.current.address;
            var priceBody = { 
                address,
                lng,
                lat,
                barcode,
                price,
                dateFrom,
                dateTo,
                withdrawn: 0
            };
        }
        else {
            name = document.getElementById('addprice_name').value;
            const postal = document.getElementById('addprice_postal').value;
            const address_name = document.getElementById('addprice_address').value;
            const number = document.getElementById('addprice_number').value;
            const total = address_name + ' ' + number + ' ' + postal;
            
            var result = await address_to_coords(total);
            if (result) {
                lat = result[0];
                lng = result[1];
                address = total;
                this.setState({error_address: false});
            }
            else {
                this.setState({error_address: true});
                return;
            }
            
            var priceBody = { 
                name,
                dateFrom,
                dateTo,
                address,
                lng,
                lat,
                barcode,
                price,
                withdrawn: 0
            };
        }
        
        console.log(priceBody);
        
        const url = 'http://localhost:3002/shops';
        const answer = await send_to_server(url, priceBody);
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({error: true});
        }
    }
    
    toggleModal() {
        this.setState({
          isOpen: !this.state.error
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
                <Navbar color="faded" light>
                <NavbarBrand><img src={"/public/logo_transparent.png"} width="150px" onClick={() => this.homepage()}/></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink><Settings/></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                
                <Form id="addproduct" onSubmit={this.handleSubmit}>
                        <FormGroup check row>
                            <Label sm={3} for="addprice_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                            <Col sm={3}>
                                <Input id="addprice_barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Col sm={4}>
                                <Label sm={3} for="addprice_location"> Τωρινή τοποθεσία</Label>
                                <Input type="checkbox" name="location" id="addprice_location" onChange={() => this.currentLocation()}></Input>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3}>Ή</Label>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="addprice_name">Όνομα Καταστήματος:</Label>
                            <Col sm={3}>
                                <Input id="addprice_name" name="name" type="text" disabled={this.flag}/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="addprice_address">Διεύθυνση:</Label>
                            <Col sm={3}>
                                <Input id="addprice_address" invalid={this.state.error_address} name="address" pattern="[^\u0000-\u007F]+([/\w\.]?[\s]*[^\u0000-\u007F]*)*" type="text" disabled={this.flag} required/>
                                <FormFeedback valid={!this.state.error_address}>Η διεύθυνση δεν είναι έγκυρη.</FormFeedback>
                            </Col>
                        </FormGroup>
                        <br/>
                        <FormGroup check inline>
                            <Col sm={2}>
                                <Label for="addprice_number">Αριθμός:</Label>
                                <Input id="addprice_number" invalid={this.state.error_address} name="number" type="text" disabled={this.flag} required/>
                            </Col>
                            
                            <Col sm={2}>
                                <Label for="addprice_postal">ΤΚ:</Label>
                                <Input id="addprice_postal" invalid={this.state.error_address} name="postal" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="addprice_price">Τιμή:</Label>
                            <Col sm={1}>
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
                            <Label sm={3} for="dateTo">Ημερομηνία παρατήρησης:</Label>
                            <Col sm={2}>
                                <Input id="dateTo" type="date" name="dateTo" min={date}/>
                            </Col>
                        </FormGroup>
                        
                        <button className="btn" type="submit" id="button1">Προσθήκη</button>
                        <Modal isOpen={this.state.error} toggle={this.toggleModal}>
                            <ModalBody>Το προϊόν με barcode {this.state.barcode} δε βρέθηκε.</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal}>Διόρθωση Barcode</Button>{' '}
                                <Button color="secondary" onClick={this.homepage}>Ακύρωση</Button>
                                <Button color="secondary" onClick={this.new_product}>Προσθήκη νέου προϊόντος</Button>
                            </ModalFooter>
                        </Modal>
                </Form>
                <Button onClick={() => this.nearby_shops()}> Test nearby shops </Button>
                <ModalExample ref='nearby_shops'/>
            </div>
        );
  }
}

export default Product;
