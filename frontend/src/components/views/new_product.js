import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Button, Form, Container, FormGroup, Row, Col, InputGroupAddon, InputGroup } from 'reactstrap';
import {Categories} from '../helper_components/categories_menu';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

class newProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {success: null, error: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.homepage = this.homepage.bind(this);
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
    
    homepage () {
        browserHistory.push('/');
    }
    
    toggleModal() {
        this.setState({ error: !this.state.error });
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
        var tags_list = (document.getElementById('new_product_tags').value).split(',');
        
        tags_list = tags_list.filter(onlyUnique);
        var tags = [];
        for (var i=0; i<tags_list.length; i++) {
            var temp = tags_list[i].replace(/\s+/g,' ').trim();
            if (temp === "") continue;
            tags.push(temp);
        }
        
        tags = tags.filter( onlyUnique );
        
        var product = { 
            description,
            name,
            barcode,
            brand,
            volume,
            category,
            tags,
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
            <NavBarClass/>
            
            <Container className="newProduct">
                <h2 align="center">Εισαγωγή Προϊόντος</h2>
                <hr></hr>
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
                    <Col sm={6}>
                        <Categories ref='new_product_category'/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={6} for="new_product_tags">Χαρακτηριστικά Προϊόντος:</Label>
                    <Col sm={6}>
                        <Input type="textarea" name="text" id="new_product_tags" onChange={this.handleChangeTags} value={this.state.tags}/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={6} for="new_product_description">Περιγραφή προϊόντος:</Label>
                    <Col sm={6}>
                        <Input type="textarea" name="text" id="new_product_description" />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Label sm={3} for="new_product_volume">Όγκος:</Label>
                    <Col sm={3}>
                        <InputGroup>
                            <Input type="text" id="new_product_volume" pattern="[0-9]+" name="new_product_volume" required/>
                            <InputGroupAddon addonType="append">ml</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <hr></hr>
                <div className="text-center">
                <Button type="submit" id="button1">Προσθήκη</Button>{'  '}
                <Button type="button" id="button2" onClick={this.homepage}>Ακύρωση</Button>
                </div>
            </Form>
            </Container>
            
            
            <Modal isOpen={this.state.error} toggle={this.toggleModal}>
                <ModalBody>Το αίτημα προσθήκης δεν ήταν επιτυχές.</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen={this.state.success}>
                <ModalBody>Το αίτημα προσθήκης ήταν επιτυχές.</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
            
           </div>
        );
  }
}

export default newProduct;

