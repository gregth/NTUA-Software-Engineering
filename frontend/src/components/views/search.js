/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faBuilding, faBars, faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';
import {falHeart} from '@fortawesome/free-regular-svg-icons';
import { browserHistory } from 'react-router';
import MapClass from './map';
import Range from './range';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import cookie from 'react-cookies';
import {Product} from './product';
import {Shop} from './shop';
import {Categories} from './categories_menu';

class Search extends Component {
 
    constructor(props) {
        super(props);
        this.state = {search: [], price: 50, show_map: false, username: cookie.load('username'), products: [], results: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.only_nearby_shops = this.only_nearby_shops.bind(this);
        this.logoff = this.logoff.bind(this);        
        this.delete = this.delete.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.newprice = this.newprice.bind(this);
        this.newshop = this.newshop.bind(this);
        this.favourite_products = this.favourite_products.bind(this);
        this.favourite = this.favourite.bind(this);
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
        
    logoff () {
        cookie.remove('username', { path: '/' });
        browserHistory.push('/');
    }
    
    newprice () {
        browserHistory.push('/addprice');
    }
    
    newshop () {
        browserHistory.push('/addshop');
    }
    
    delete () {
        //TODO 
        cookie.remove('username', { path: '/' });
        browserHistory.push('/');
    }
    
    favourite_products () {
        browserHistory.push('/products');
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
       
        if (s !== '') {
            this.selectedCheckboxes.add(s);
        }
        var temp = this.state.show_map;
        
        var shop = new Shop({name: 'cava1', id: 1, address: 'Athens 1', lat: 37.9738, lgn:23.7275});
        var product = new Product({name: 'pr1', barcode: 12345, price: 12, shop:shop, favourite: true, id: 0});
        this.state.products.push(product);
        this.setState({results: true, show_map: !temp, search: this.selectedCheckboxes});
    }
    
    render() {
        return (
            <div>
                <div className="dropdown">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars}></FontAwesomeIcon> {this.state.username}</button>
                    <div className="dropdown-content">
                        <div onClick={() => this.favourite_products()}>Αγαπημένα Προϊόντα</div>
                        <div href="#">Αγαπημένα Καταστήματα</div>
                        <div onClick={() => this.delete()}>Απενεργοποίηση Λογαριασμού</div>
                        <div onClick={() => this.logoff()}>Αποσύνδεση</div>
                    </div>
                </div>
                <button className="new" id="new_product" type="submit" onClick={() => this.newprice()}>
                    <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Προσθήκη Νέας Τιμής 
                </button>
                <button className="new" id="new_shop" type="submit" onClick={() => this.newshop()}><FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> Προσθήκη Νέου Καταστήματος </button>
                <br/>
                
                <div className="search">
                    <h1> Αναζήτηση Προϊόντων </h1>
                    <form id="searching">
                        <Categories/>
                        <input id="search" type="text" placeholder="Αναζήτηση με όνομα.." name="search"></input>
                        <button className="search_btn" id="search_btn" type="submit" onClick={this.handleSubmit}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                        <br/><br/>
                        <label> Μέγιστη τιμή </label>
                        <Range range={this.state.price} updateRange={this.updateRange}/>
                        <br/>
                        <label> Only nearby shops</label>
                        <input type="checkbox" name="location" onChange={() => this.only_nearby_shops()}></input>
                        
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
                        {this.state.show_map
                            ?<MapClass/>
                            : <div/>
                        }   
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default Search;