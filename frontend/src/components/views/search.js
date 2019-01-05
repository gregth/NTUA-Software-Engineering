/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faBuilding, faBars, faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import MapClass from './map';
import Range from './range';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import cookie from 'react-cookies';
import {Product} from './product';
import {Shop} from './shop';
import {Settings} from './dropdown_settings';
import {Categories} from './categories_menu';
import { NavbarBrand, Navbar, Nav, NavItem, NavLink, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, NavbarToggler } from 'reactstrap';

class Search extends Component {
 
    constructor(props) {
        super(props);
        this.state = {search: null, price: 50, show_map: false, username: cookie.load('username'), products: [], results: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.only_nearby_shops = this.only_nearby_shops.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.newprice = this.newprice.bind(this);
        this.newshop = this.newshop.bind(this);
        this.favourite = this.favourite.bind(this);
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
    
    newprice () {
        browserHistory.push('/addprice');
    }
    
    newshop () {
        browserHistory.push('/addshop');
    }
  
    only_nearby_shops () {
        //TODO send request
    }
    
    favourite (id, event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        var temp = this.state.products[0].favourite;
        this.state.products[id].favourite = !temp;
        var temp_products = this.state.products;
        this.setState({products: temp_products});
    }
    
    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const s = document.getElementById('search').value;
       
        var temp = this.state.show_map;
        
        var shop = new Shop({name: 'cava1', id: 1, address: 'Athens 1', lat: 37.9738, lgn:23.7275});
        var product = new Product({name: 'pr1', barcode: 12345, price: 12, shop:shop, favourite: true, id: 0});
        this.state.products.push(product);
        this.setState({results: true, show_map: !temp, search: s});
    }
    
    render() {
        return (
            <div>
                <Navbar color="faded" light>
                <NavbarBrand><Settings/></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => this.newprice()}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Προσθήκη Νέας Τιμής</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                
                <button className="new" id="new_shop" type="submit" onClick={() => this.newshop()}><FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> Προσθήκη Νέου Καταστήματος </button>
                <br/>
                
                <div className="div_center">
                    <img src={"/public/logo_transparent.png"} className="App-logo" alt="logo" />

                    <div className="search">
                        <Form id="searching">
                            <FormGroup check inline>
                                <Categories/>
                                <InputGroup>
                                    <Input id="search" placeholder="Αναζήτηση με όνομα.."></Input>
                                    <InputGroupAddon addonType="append">
                                        <button className="search_btn" id="search_btn" onClick={this.handleSubmit}>
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <label> Μέγιστη τιμή </label>
                                <Range range={this.state.price} updateRange={this.updateRange}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label>
                                    <Input type="checkbox" id="location" onChange={() => this.only_nearby_shops()}/>{' '}
                                    Μόνο κοντινά καταστήματα
                                </Label>
                            </FormGroup>
                        </Form> 
                    </div>
                </div>
                {this.state.results
                    ? <div> {this.state.products.map(product => (
                            <div> {product.name} {product.price}€ 
                            {product.favourite 
                            ? <button title='Αφαίρεση από τα αγαπημένα' onClick={(e) => this.favourite(product.id, e)} className='icon'><FontAwesomeIcon color="#FF0000" icon={faHeart}></FontAwesomeIcon></button>
                            : <button title='Προσθήκη στα αγαπημένα' onClick={(e) => this.favourite(product.id, e)} className='icon'><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></button> 
                            }
                            </div>
                        ))}</div>
                    : <div></div>
                }   
                <div className="map">
                    {this.state.show_map
                        ?<MapClass/>
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default Search;