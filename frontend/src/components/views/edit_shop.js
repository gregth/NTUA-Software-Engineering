import React, { Component } from "react";
import { browserHistory } from 'react-router';
import { Input, Button, Form, FormFeedback,
        Modal, ModalBody, ModalFooter, FormGroup, Label, FormText, Container, Col, Alert } from 'reactstrap';
import {receive_from_server} from '../communication/receive';
import {put} from '../communication/put';
import {patch} from '../communication/patch';
import { address_to_coords } from '../functions/address_to_coordinates';
import NavBarClass from '../helper_components/navbar';
import { getLocation } from '../functions/current_location';

function onlyUnique (value, index, self) { 
    return self.indexOf(value) === index;
}

function check_changes (original, edited) {
    const keys = Object.keys(edited);
    var changed = [];
    
    var unchanged = ['withdrawn',  'tags'];
    for (var i=0; i<unchanged.length; i++) {
        var index = keys.indexOf(unchanged[i]); 
        if (index > -1) {
            keys.splice(index, 1);
        }
    }
    
    for (i=0; i<keys.length; i++) {
        if (original[keys[i]] !== edited[keys[i]]) {
            changed.push(keys[i]);
        }
    }
    
    if (original.tags.join(',') !== edited.tags) {
        changed.push('tags');
    }
    return changed;
}

export default class EditShop extends Component {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this);
        this.state = { message_edit: null, error_message: null, message: null, flag: false, details: null, 
                    name: '', address: '', phone: '', error: null, success: null, 
                    not_found: null, tags: '', success_edit: null};
        this.toggleModal = this.toggleModal.bind(this);
        this.homepage = this.homepage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._isMounted = null;
    }
    
    componentDidMount () {        
        this._asyncRequest = this.request().then(
            details => {
                this._asyncRequest = null;
                this.setState({details, tags: details.tags, name: details.name, address: details.address, telephone: details.telephone});
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
    
    validatePhone() {
        const phoneRex = /^69\d{8}|^210\d{7}$/;
        var result = null;
        const phone = document.getElementById('edit_shop_phone').value;
        if (phoneRex.test(phone)) {
          result = true;
        } 
        else {
          result = false;
        }
        this.setState({ checkPhone: result });
    }
    
    async currentLocation () {
        var checkBox = document.getElementById("edit_shop_location");
        this.setState({flag: !this.state.flag});
        
        if (!checkBox.checked) {
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: { latitude: result[0], longitude: result[1], address: result[2]}, show_current: !temp});
    }
    
    async request() {
        this.setState({success: null, error: null, not_found: null, message: null, error_message: null });
        const url = 'http://localhost:3002/shops/' + this.props.location.query.id;
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
        this.setState({details: details});
        return details;
    }
    
    handleChange(event) {
        var name = event.target.name;
        if (name === 'telephone') this.validatePhone();
        this.setState({[name]: event.target.value});
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    toggleModal() {
        this.setState({ not_found_edit: !this.state.not_found_edit });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        
        this.setState({success_edit: null, message_edit: null, not_found_edit: null});
        
        const name = document.getElementById('edit_shop_name').value;
        const telephone = document.getElementById('edit_shop_phone').value; 
        var tags_list = (document.getElementById('edit_shop_tags').value).split(',');
        
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
        
        var checkBox = document.getElementById("edit_shop_location");
        
        if (checkBox.checked) {
            lng = this.state.current.longitude;
            lat = this.state.current.latitude;
            address = this.state.current.address;
        }
        else {
            address = document.getElementById('edit_shop_address').value;
            var result = await address_to_coords(address);
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
        
        var shop = {
            name,
            address,
            lng,
            lat,
            telephone,
            tags: tags.join(','),
            withdrawn: this.state.details.withdrawn
        };
        
        console.log(shop);
        
        var changed = check_changes(this.state.details, shop);
        
        const url = 'http://localhost:3002/shops/' + this.props.location.query.id;
        
        var answer;
        
        if (changed.length === 1) {
            var key = changed[0];
            var body = {};
            body[key] = shop[key];
            this._isMounted = await patch(url, body);
        }
        else if (changed.length > 1) {
            this._isMounted = await put(url, shop); 
        }
        else {
            browserHistory.push('/shops');
        }
        
        answer = this._isMounted;
        
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success_edit: true});
            }
            else if (answer.status === 404) {
                this.setState({message_edit: 'Error 404 - Το αίτημα δεν ήταν επιτυχές', not_found_edit: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message_edit: 'Error 401 - Μη επιτρεπόμενη ενέργεια', not_found_edit: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message_edit: 'Error 403 - Απαιτείται σύνδεση', not_found_edit: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message_edit: 'Error 400 - Μη έγκυρες παράμετροι αιτήματος.', not_found_edit: true});
                return;
            }
            else {
                this.setState({message_edit: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found_edit: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
    }
    
    render() {
      return (
        <div>
            <NavBarClass/>
            
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
            <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
            {this.state.details === null
            ?<div> Loading </div>
            : <div>
                <Container className="EditShop">
                <h2 align="center">Επεξεργασία Καταστήματος</h2>
                <hr></hr>
                <Form id="edit_shop" onSubmit={this.handleSubmit}>
                    <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                    
                    <FormGroup check row>
                        <Label sm={6} for="name">Όνομα Καταστήματος:</Label>
                        <Col sm={3}>
                            <Input id="edit_shop_name" name="name" value={this.state.name} onChange={this.handleChange} type="text" required/>
                        </Col>
                    </FormGroup>
                    <div className="row mt-3"></div>
                    <FormGroup check>
                        <Label check>
                            <Col sm={9}>
                                <Input type="checkbox" name="location" id="edit_shop_location" onChange={this.handleChange}></Input>
                            </Col>
                            Tωρινή Τοποθεσία
                        </Label>
                    </FormGroup>
                    
                    <FormGroup check row>
                        <Label sm={3} for="address">Διεύθυνση:</Label>
                        <Col sm={3}>
                            <Input invalid={this.state.error_address} value={this.state.address} onChange={this.handleChange} valid={false} id="edit_shop_address" name="address" type="text" disabled={this.state.flag} required/>
                            <FormFeedback valid={!this.state.error_address}>Η διεύθυνση δεν είναι έγκυρη.</FormFeedback>
                        </Col>
                    </FormGroup>
                    <div className="row mt-3"></div>
                    <FormGroup check row>
                        <Label sm={6} for="edit_shop_tags">Χαρακτηριστικά Καταστήματος:
                        <FormText>Διαχωρισμός χαρακτηριστικών με κόμμα (,)</FormText></Label>
                        <Col sm={8}>
                            <Input type="textarea" name="tags" id="edit_shop_tags" onChange={this.handleChange} value={this.state.tags}/>
                        </Col>
                    </FormGroup>
                    <div className="row mt-3"></div>
                    <FormGroup check row>
                        <Label sm={6} for="phone">Τηλέφωνο Καταστήματος:</Label>
                        <Col sm={3}>
                            <Input type="tel" id="edit_shop_phone" name="telephone" value={this.state.telephone} onChange={this.handleChange} invalid={this.state.checkPhone===false} valid={this.state.checkPhone}/>
                        </Col>
                    </FormGroup>
                    <hr></hr>
                    <div className="text-center">
                        <Button type="submit" id="button1">Αποθήκευση</Button>{' '}
                        <Button type="button" id="button2" onClick={browserHistory.goBack}>Ακύρωση</Button>
                    </div>
                </Form>

                </Container>
            </div>
            }
            
            <Modal isOpen={this.state.not_found_edit} toggle={this.toggleModal}>
                <ModalBody>Η επεξεργασία δεν ολοκληρώθηκε επιτυχώς. {this.state.message_edit}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
                
            <Modal isOpen={this.state.success_edit}>
                <ModalBody>Η επεξεργασία ολοκληρώθηκε επιτυχώς.</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
        </div>

          );
    }
}

