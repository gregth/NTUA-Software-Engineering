/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import { browserHistory } from 'react-router';
import MapClass from '../helper_components/map';
import {Categories} from '../helper_components/categories_menu';
import { Input, InputGroupAddon, Button, Form, InputGroup, 
        Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Container, Row,  Col, Table, Alert } from 'reactstrap';
import {send_to_server} from '../communication/send';
import {Settings} from '../helper_components/dropdown_settings';
import {receive_from_server} from '../communication/receive';
import ProductsTable from '../helper_components/results_products_table';
import Search from '../helper_components/searchComponent';
import cookie from 'react-cookies';
import {put} from '../communication/put';
import {patch} from '../communication/patch';
import NavBarClass from '../helper_components/navbar';

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function onlyUnique (value, index, self) { 
    return self.indexOf(value) === index;
}

function check_changes (original, edited) {
    const keys = Object.keys(edited);
    var changed = [];
    
    var unchanged = ['withdrawn', 'barcode', 'tags'];
    for (var i=0; i<unchanged.length; i++) {
        var index = keys.indexOf(unchanged[i]); 
        if (index > -1) {
            keys.splice(index, 1);
        }
    }
    
    for (var i=0; i<keys.length; i++) {
        if (original[keys[i]] !== edited[keys[i]]) {
            changed.push(keys[i]);
        }
    }
    
    if (!arraysEqual(original.tags, edited.tags)) {
        changed.push('tags');
    }
    return changed;
}

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this);
        this.state = {details: null, error: null, success: null, not_found: null, volume: '',
                    description: '', tags: '', name: '', brand: '', success_edit: null, error_edit: null, not_found: null};
        this.toggleModal = this.toggleModal.bind(this);
        this.homepage = this.homepage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
     componentDidMount () {
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
        
        this._asyncRequest = this.request().then(
            details => {
                this._asyncRequest = null;
                this.setState({details, description: details.description, tags: details.tags, 
                    name: details.name, brand: details.brand, volume: details.volume});
            }
        );
    }
    
    componentWilldUnmount () {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    async request () {
        const url = 'http://localhost:3002/products/' + this.props.location.query.id;
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
        this.setState({details: details});
        return details;
    }
    
    handleChange(event) {
        var name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    toggleModal() {
        this.setState({ error: !this.state.error });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        
        this.setState({success_edit: null, error_edit: null, not_found_edit: null});
        
        const name = document.getElementById('edit_product_name').value;
        const barcode = document.getElementById('edit_product_barcode').value;
        const brand = document.getElementById('edit_product_brand').value;
        const volume = document.getElementById('edit_product_volume').value;
        const description = document.getElementById('edit_product_description').value; 
        var tags_list = (document.getElementById('edit_product_tags').value).split(',');
        const category = this.refs.edit_product_category.state.category;
        
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
        
        var product = {
            description,
            name,
            barcode,
            brand,
            volume,
            category,
            tags,
            withdrawn: this.state.details.withdrawn
        };
        
        console.log(product);
        
        var changed = check_changes(this.state.details, product);
        
        const url = 'http://localhost:3002/products/' + this.props.location.query.id;
        
        var answer;
        
        if (changed.length === 1) {
            var key = changed[0];
            answer = await patch(url, {key: this.state.details[key]});
        }
        else if (changed.length > 1) {
            answer = await put(url, product); 
        }
        else {
            browserHistory.push('/products');
        }
        
        if (answer === 'error') {
            this.setState({error_edit: true});
            return;
        }
        
        if (answer.status === 200) {
            this.setState({success_edit: true});
        }
        else {
            this.setState({not_found_edit: true});
            return;
        }
    }
    
    render() {
      return (
        <div>
            <NavBarClass/>
            
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
            {this.state.details === null
            ?<div> Loading </div>
            : <div>
                <Form id="edit_product_form" onSubmit={this.handleSubmit}>
                    <FormGroup check row>
                        <Label sm={3} for="edit_product_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input disabled id="edit_product_barcode" name="barcode" pattern="[0-9]{1,128}" onChange={this.handleChange} value={this.state.details.extraData.barcode} type="text"/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_name" className="mr-sm-2">Όνομα Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_name" name="name" value={this.state.name} onChange={this.handleChange} type="text"/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_brand" className="mr-sm-2">Μάρκα Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_brand" name="brand" value={this.state.brand} onChange={this.handleChange} type="text"/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_category">Κατηγορία:</Label>
                        <Col sm={1}>
                            <Categories ref='edit_product_category' default={this.state.details.category}/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_tags">Χαρακτηριστικά Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input type="textarea" name="tags" id="edit_product_tags" onChange={this.handleChange} value={this.state.tags}/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_description">Περιγραφή προϊόντος:</Label>
                        <Col sm={3}>
                            <Input type="textarea" name="description" id="edit_product_description" onChange={this.handleChange} value={this.state.description}/>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Label sm={3} for="edit_product_volume">Όγκος:</Label>
                        <Col sm={2}>
                            <InputGroup>
                                <Input type="text" id="edit_product_volume" pattern="[0-9]+" value={this.state.volume} onChange={this.handleChange} name="volume"/>
                                <InputGroupAddon addonType="append">ml</InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <Button type="submit" id="button1">Αποθήκευση</Button>
                </Form>
                <Button type="button" onClick={browserHistory.goBack}>Ακύρωση</Button>
            </div>
            }
            
            <Modal isOpen={this.state.error_edit} toggle={this.toggleModal}>
                <ModalBody>Η επεξεργασία δεν ολοκληρώθηκε επιτυχώς.</ModalBody>
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
