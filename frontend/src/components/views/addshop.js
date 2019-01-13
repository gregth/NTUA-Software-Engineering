/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import { getLocation } from '../functions/current_location';
import { send_to_server } from '../communication/send';
import cookie from 'react-cookies';
import { Navbar, Nav, NavItem, NavbarBrand, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, 
        Button, Form, FormGroup, Row, Col, InputGroupAddon, InputGroup, FormFeedback, Alert } from 'reactstrap';
import { address_to_coords } from '../functions/address_to_coordinates';
import {Settings} from '../helper_components/dropdown_settings';

class Shop extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {success: null, error: null, current: null, checkPhone: null, error_address: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.search = this.search.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.flag = false;
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
    
    validatePhone() {
        const phoneRex = /^69\d{8}|^210\d{7}$/;
        var result = null;
        const phone = document.getElementById('new_shop_phone').value;
        if (phoneRex.test(phone)) {
          result = true;
        } 
        else {
          result = false;
        }
        this.setState({ checkPhone: result });
    }
    
    search () {
        browserHistory.push('/search');
    }
    
    async currentLocation () {
        var checkBox = document.getElementById("new_shop_location");
        this.flag = !this.flag;
        
        if (!checkBox.checked) {
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: { latitude: result[0], longitude: result[1], address: result[2]}, show_current: !temp});
    }
    
    toggleModal() {
        this.setState({ error: !this.state.error });
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({success: null, error: null, need_login: null, not_found: null});
        const name = document.getElementById('new_shop_name').value;
        var lng = null;
        var lat = null;
        var address = null;
        
        var checkBox = document.getElementById("new_shop_location");
        
        if (checkBox.checked) {
            lng = this.state.current.longitude;
            lat = this.state.current.latitude;
            address = this.state.current.address;
        }
        else {
            const postal = document.getElementById('new_shop_postal').value;
            const address_name = document.getElementById('new_shop_address').value;
            const number = document.getElementById('new_shop_number').value;
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
        }
        
        var shop = { 
            name,
            address,
            lng,
            lat,
            withdrawn: 0
        };
        
        console.log(shop);
        const url = 'http://localhost:3002/shops';
        const answer = await send_to_server(url, shop);
        
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
       
    }
    
    render() {
        return(
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand><img src={"/public/logo_transparent.png"} width="150px" onClick={() => this.search()}/></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink><Settings/></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Form id="new_shop" onSubmit={this.handleSubmit}>
                    <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                    
                    <FormGroup check row>
                        <Label sm={3} for="name">Όνομα Καταστήματος:</Label>
                        <Col sm={3}>
                            <Input id="new_shop_name" name="name" type="text" required/>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Label> Τωρινή τοποθεσία </Label>
                        <Col sm={1}>
                            <Input type="checkbox" name="location" id="new_shop_location" onChange={() => this.currentLocation()}></Input>
                        </Col>
                    </FormGroup>
                    <div> Ή </div>
                    <FormGroup check row>
                        <Label sm={3} for="address">Διεύθυνση:</Label>
                        <Col sm={3}>
                            <Input invalid={this.state.error_address} valid={false} id="new_shop_address" name="address" pattern="[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώ]+" type="text" disabled={this.flag} required/>
                            <FormFeedback valid={!this.state.error_address}>Η διεύθυνση δεν είναι έγκυρη.</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="number">Αριθμός:</Label>
                        <Col sm={1}>
                            <Input invalid={this.state.error_address} type="text" id="new_shop_number" pattern="[0-9]+" disabled={this.flag} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="postal">ΤΚ:</Label>
                        <Col sm={1}>
                            <Input invalid={this.state.error_address} id="new_shop_postal" name="postal" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="hours">Ωράριο:</Label>
                        <Col sm={1}>
                            <span> Από </span>
                            <Input type="time" name="opening" id="new_shop_opening"></Input>
                            <span> Έως </span>
                            <Input type="time" name="closing" id="new_shop_closing"></Input>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Col sm={1}>
                            <Label> Καθημερινές </Label>
                            <Input type="checkbox" name="days" id="new_shop_workdays"></Input>
                            <Label> Σάββατο </Label>
                            <Input type="checkbox" name="days" id="new_shop_saturday"></Input>
                            <Label> Κυριακή </Label>
                            <Input type="checkbox" name="days" id="new_shop_sunday"></Input>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="phone">Τηλέφωνο Καταστήματος:</Label>
                        <Col sm={3}>
                            <Input type="tel" id="new_shop_phone" name="phone" invalid={this.state.checkPhone===false} valid={this.state.checkPhone} onChange={() => this.validatePhone()}/>
                        </Col>
                    </FormGroup>

                    <Button type="submit" id="button1">Προσθήκη</Button>
                    <Button type="button" id="button2" onClick={this.search}>Ακύρωση</Button>

                </Form>
                <Modal isOpen={this.state.error} toggle={this.toggleModal}>
                    <ModalBody>Το αίτημα προσθήκης δεν ήταν επιτυχές.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                        <Button color="secondary" onClick={this.search}>Αρχική σελίδα</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.success}>
                    <ModalBody>Το αίτημα προσθήκης ήταν επιτυχές.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.search}>Αρχική σελίδα</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
  }
}

export default Shop;
