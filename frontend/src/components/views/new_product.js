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
import {  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Button, Form, FormGroup, Row, Col, InputGroupAddon, InputGroup } from 'reactstrap';

class newProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {name: null, barcode: null, volume: null, brand: null, success: null, error: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.search = this.search.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    toggleModal() {
        this.setState({
          error: !this.state.error
        });
    }
    
    search() {
        browserHistory.push('/search');
    }
    
    handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const name = document.getElementById('new_product_name').value;
        const barcode = document.getElementById('new_product_barcode').value;
        const brand = document.getElementById('new_product_brand').value;
        const volume = document.getElementById('new_product_volume').value;
        var product = { 
            description: "Product Description",
            name,
            barcode,
            brand,
            volume,
            withdrawn: 0
        }
        console.log(product)
        
        fetch('http://localhost:3002/products', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: 1234
            },
            body: JSON.stringify(product)
       })
       .then((response) => {
           console.log(response)
       })
        .catch((error) => {
            console.error(error);
        });

        this.setState({ name: name, barcode: barcode, volume: volume, brand: brand});   
       
        this.setState({success: true});
    }
  
    render() {
        return(
            <div>
            <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
            <Form id="new_product_form">
                <div></div>
                
                <br/>
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
                    <Label sm={3} for="new_product_volume">Όγκος:</Label>
                    <Col sm={1}>
                        <InputGroup>
                            <Input type="text" id="new_product_volume" pattern="[0-9,]+" name="new_product_volume" required/>
                            <InputGroupAddon addonType="append">ml</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <Button type="submit" id="button1" onClick={this.handleSubmit}>Προσθήκη</Button>
            </Form>
            <Button type="button" id="button2" onClick={browserHistory.goBack}>Ακύρωση</Button>
            
            <Modal isOpen={this.state.error} toggle={this.toggleModal}>
                <ModalBody>Το αίτημα προσθήκης δεν ήταν επιτυχές.</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                    <Button color="secondary" onClick={this.search}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen={this.state.success} toggle={this.toggleModal}>
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

