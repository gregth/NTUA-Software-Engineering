/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import { browserHistory } from 'react-router';
import MapClass from '../helper_components/map';
import {Categories} from '../helper_components/categories_menu';
import { Navbar, Nav, NavItem, NavbarBrand, NavLink, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Row,  Col, Table, Alert } from 'reactstrap';
import {send_to_server} from '../communication/send';
import {Settings} from '../helper_components/dropdown_settings';
import {receive_from_server} from '../communication/receive';
import ProductsTable from '../helper_components/results_products_table';
import Search from '../helper_components/searchComponent';
import cookie from 'react-cookies';

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this);
        this.state = {details: null, error: null, success: null, not_found: null, description: '', tags: ''};
        
        this.homepage = this.homepage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
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
                this.setState({details, description: details.description, tags: details.tags});
            }
        );
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    async request() {
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
    
    handleChangeTags (event) {
        this.setState({tags:  event.target.value});
    }
    
    handleChangeDescription (event) {
        this.setState({description:  event.target.value});
    }
  
    homepage() {
        browserHistory.push('/search');
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const name = document.getElementById('edit_product_name').value;
        const barcode = document.getElementById('edit_product_barcode').value;
        const brand = document.getElementById('edit_product_brand').value;
        const volume = document.getElementById('edit_product_volume').value;
        const description = document.getElementById('edit_product_description').value; 
        var tags_list = (document.getElementById('edit_product_tags').value).split(',');
        const category = this.refs.edit_product_category.state.category;
        
        tags_list = tags_list.filter(onlyUnique);
        var tags = [];
        for (var i=0; i<tags_list.length; i++) {
            var temp = tags_list[i].replace(/\s+/g,' ').trim();
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
        /*const url = 'http://localhost:3002/products';
        const answer = await send_to_server(url, product);
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({error: true});
        }*/
    }
    
    render() {
      return (
        <div>
            <Navbar color="faded" light>
                    <NavbarBrand><img src={"/public/logo_transparent.png"} width="150px" onClick={() => this.homepage()}/></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink><Settings/></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
            {this.state.details === null
            ?<div> Loading </div>
            : <div>
                <Form id="edit_product_form" onSubmit={this.handleSubmit}>
                    <FormGroup check row>
                        <Label sm={3} for="edit_product_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_barcode" name="edit_product_barcode" pattern="[0-9]{1,128}" value={this.state.details.extraData.barcode} type="text"/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_name" className="mr-sm-2">Όνομα Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_name" name="edit_product_name" value={this.state.details.name} type="text"/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_brand" className="mr-sm-2">Μάρκα Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_brand" name="edit_product_brand" value={this.state.details.brand} type="text"/>
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
                            <Input type="textarea" name="text" id="edit_product_tags" onChange={this.handleChangeTags} value={this.state.tags}/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_description">Περιγραφή προϊόντος:</Label>
                        <Col sm={3}>
                            <Input type="textarea" name="text" id="edit_product_description" onChange={this.handleChangeDescription} value={this.state.description}/>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Label sm={3} for="edit_product_volume">Όγκος:</Label>
                        <Col sm={2}>
                            <InputGroup>
                                <Input type="text" id="edit_product_volume" pattern="[0-9]+" value={this.state.details.volume} name="edit_product_volume"/>
                                <InputGroupAddon addonType="append">ml</InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <Button type="submit" id="button1">Αποθήκευση</Button>
                </Form>
                <Button type="button" onClick={browserHistory.goBack}>Ακύρωση</Button>
            </div>
            }
        </div>

          );
    }
}
