/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Button, Form, FormGroup, Row, Col, InputGroupAddon, InputGroup } from 'reactstrap';
import {Categories} from './categories_menu';
import {send_to_server} from './send';

class newProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {success: null, error: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.search = this.search.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    toggleModal() {
        this.setState({ error: !this.state.error });
    }
    
    search() {
        browserHistory.push('/search');
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const name = document.getElementById('new_product_name').value;
        const barcode = document.getElementById('new_product_barcode').value;
        const brand = document.getElementById('new_product_brand').value;
        const volume = document.getElementById('new_product_volume').value;
        const description = document.getElementById('new_product_description').value; 
        const category = this.refs.new_product_category.state.category;
        
        var product = { 
            description,
            name,
            barcode,
            brand,
            volume,
            category,
            withdrawn: 0
        };
        
        console.log(product);
        const url = 'http://localhost:3002/products';
        const answer = await send_to_server(url, product);
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({error: true});
        }
    }
  
    render() {
        return(
            <div>
            <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
            <Form id="new_product_form" onSubmit={this.handleSubmit}>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                    <Col sm={3}>
                        <Input id="new_product_barcode" name="new_product_barcode" pattern="[0-9]{1,128}" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_name" className="mr-sm-2">Όνομα Προϊόντος:</Label>
                    <Col sm={3}>
                        <Input id="new_product_name" name="new_product_name" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_brand" className="mr-sm-2">Μάρκα Προϊόντος:</Label>
                    <Col sm={3}>
                        <Input id="new_product_brand" name="new_product_brand" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_category">Κατηγορία:</Label>
                    <Col sm={1}>
                        <Categories ref='new_product_category'/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_description">Περιγραφή προϊόντος:</Label>
                    <Col sm={1}>
                        <Input type="textarea" name="text" id="new_product_description" />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Label sm={3} for="new_product_volume">Όγκος:</Label>
                    <Col sm={1}>
                        <InputGroup>
                            <Input type="text" id="new_product_volume" pattern="[0-9]+" name="new_product_volume" required/>
                            <InputGroupAddon addonType="append">ml</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <Button type="submit" id="button1">Προσθήκη</Button>
            </Form>
            <Button type="button" id="button2" onClick={this.search}>Ακύρωση</Button>
            
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

export default newProduct;

