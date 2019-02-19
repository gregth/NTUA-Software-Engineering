import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import { getLocation } from '../functions/current_location';
import { send_to_server } from '../communication/send';
import cookie from 'react-cookies';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, 
        Button, Form, FormGroup, Row, FormText, Container, Col, InputGroupAddon, InputGroup, FormFeedback, Alert } from 'reactstrap';
import { address_to_coords } from '../functions/address_to_coordinates';
import {Settings} from '../helper_components/dropdown_settings';
import NavBarClass from '../helper_components/navbar';

function onlyUnique (value, index, self) { 
    return self.indexOf(value) === index;
}

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error_message: null, message: null, flag: false, success: null, error: null, current: null, checkPhone: null, error_address: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.search = this.search.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this._isMounted = null;
    }
    
    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
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
        browserHistory.push('/');
    }
    
    async currentLocation () {
        var checkBox = document.getElementById("new_shop_location");
        this.setState({flag : !this.state.flag});
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
        this.setState({ success: null, not_found: null, error: null, message: null, error_message: null });
        const name = document.getElementById('new_shop_name').value;
        var tags_list = (document.getElementById('new_shop_tags').value).split(',');
        const telephone = document.getElementById('new_shop_phone').value;
        var tags = [];
        tags_list = tags_list.filter(onlyUnique);
        for (var i=0; i<tags_list.length; i++) {
            var temp = tags_list[i].replace(/\s+/g,' ').trim();
            if (temp === "") continue;
            tags.push(temp);
        }

        tags = tags.filter( onlyUnique );
        if (tags.length > 0) {
            if (tags[0] === "") {
                tags = [];
            }
        }
        
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
            tags: tags.join(','),
            telephone,
            withdrawn: 0
        };
        
        console.log(shop);
        const url = 'http://localhost:3002/shops';
        this._isMounted = await send_to_server(url, shop);
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
    }
    
    render() {
        return(
            <div>
                <NavBarClass/>
                
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
                <Container className="Shop">
                <h2 align="center">Εισαγωγή Καταστήματος</h2>
                <hr></hr>
                <Form id="new_shop" onSubmit={this.handleSubmit}>                     
                    <FormGroup check row>
                        <Label sm={6} for="name">Όνομα Καταστήματος:</Label>
                        <Col sm={3}>
                            <Input id="new_shop_name" name="name" type="text" required/>
                        </Col>
                    </FormGroup>
                    <div className="row mt-3"></div>
                    <FormGroup check>
                        <Label check>
                        <Col sm={9}>
                            <Input type="checkbox" name="location" id="new_shop_location" onChange={() => this.currentLocation()} />{' '}
                        </Col>  
                            Tωρινή Τοποθεσία
                        </Label>
                       
                    </FormGroup>
                    <FormGroup check row>
                        <Label sm={3} for="address">Διεύθυνση:</Label>
                        <Col sm={3}>
                            <Input invalid={this.state.error_address} valid={false} id="new_shop_address" name="address" pattern="[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώ]+" type="text" disabled={this.state.flag} required/>
                            <FormFeedback valid={!this.state.error_address}>Η διεύθυνση δεν είναι έγκυρη.</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="number">Αριθμός:</Label>
                        <Col sm={1}>
                            <Input invalid={this.state.error_address} type="text" id="new_shop_number" pattern="[0-9]+" disabled={this.state.flag} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="postal">ΤΚ:</Label>
                        <Col sm={1}>
                            <Input invalid={this.state.error_address} id="new_shop_postal" name="postal" pattern="[0-9]+" type="text" disabled={this.state.flag} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={6} for="new_shop_tags">Χαρακτηριστικά Καταστήματος:
                        <FormText>Διαχωρισμός χαρακτηριστικών με κόμμα (,)</FormText></Label>
                        <Col sm={8}>
                            <Input type="textarea" name="text" id="new_shop_tags" required/>
                        </Col>
                    </FormGroup>
                    
                    <FormGroup check row>
                        <Label sm={6} for="phone">Τηλέφωνο Καταστήματος:</Label>
                        <Col sm={2}>
                            <Input type="tel" id="new_shop_phone" name="phone" invalid={this.state.checkPhone===false} valid={this.state.checkPhone} onChange={() => this.validatePhone()}/>
                        </Col>
                    </FormGroup>
                    <hr></hr>
                    <div className="text-center">
                    <Button type="submit" id="button1">Προσθήκη</Button>{'  '}
                    <Button type="button" id="button2" onClick={this.search}>Ακύρωση</Button>
                    </div>
                </Form>
                
                </Container>
                <Modal isOpen={this.state.not_found} toggle={this.toggleModal}>
                    <ModalBody>{this.state.message} </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                        <Button color="secondary" onClick={this.search}>Αρχική σελίδα</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.success}>
                    <ModalBody>Η προσθήκη ήταν επιτυχής.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.search}>Αρχική σελίδα</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
  }
}

export default Shop;
