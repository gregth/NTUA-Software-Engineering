/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes, faHome, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';

class Products extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {name: '', latitude: '', longitude: '', address: '', post_code: null, addr_num: null, phone: null, opening: null, closing: null, days: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.delete = this.delete.bind(this);
        this.show_favourite_products = this.show_favourite_products.bind(this);
        this.show_favourite_shops = this.show_favourite_shops.bind(this);
        this.show_wishlist = this.show_wishlist.bind(this);
        this.logoff = this.logoff.bind(this);
        this.wishlist = [{'name':'heineken 330ml', 'barcode':12345678}].map((d) => <li key={d.name}>{d.name}</li>);;
        this.favourite_products = [{'name':'amstel 330ml', 'barcode':12345679},{'name':'Absolut Vodka 700ml', 'barcode':12567879}].map((d) => <li key={d.name}>{d.name}</li>);
        this.favourite_shops = [{'name': 'SERAFEIM', 'address':'Nea Filadelfeia'}].map((d) => <li key={d.name}>{d.name}{d.address}</li>);
        this.state = { show_products: false, show_wish: false, show_shops: false};
    }

    homepage() {
        browserHistory.push('/search');
    }
    
    logoff() {
        browserHistory.push('/');
    }
    
    delete() {
        //TODO 
        browserHistory.push('/login');
    }
    
    show_favourite_products () {
        //TODO request favourite products
        this.setState(() => ({ show_products: true, show_shops: false, show_wish: false}));
    }
    
    show_favourite_shops () {
        //TODO request favourite shops
        this.setState(() => ({ show_products: false, show_shops: true, show_wish: false}));
    }
    
    show_wishlist () {
        //TODO request wishlist
        this.setState(() => ({ show_products: false, show_shops: false, show_wish: true}));
    }
    
    handleSubmit () {
       //TODO
    }
    
    render() {
        return(
            <div>
                <button id="logoff" type="submit" onClick={() => this.logoff()}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Logoff </button>
                <button id="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon>Home Page</button>
                <button id="show" type="submit" onClick={() => this.show_favourite_products()}>Αγαπημένα Προϊόντα</button>
                <button id="show" type="submit" onClick={() => this.show_favourite_shops()}>Αγαπημένα Καταστήματα</button>
                <button id="show" type="submit" onClick={() => this.show_wishlist()}>Wishlist</button>
                <button id="delete" type="submit" onClick={() => this.delete()}><FontAwesomeIcon icon={faUserTimes}></FontAwesomeIcon> Απενεργοποίηση Λογαριασμού</button>
                <div>
                    { this.state.show_products
                        ? <div> {this.favourite_products } </div>
                        : <div/>
                    }
                </div>
                <div>
                    { this.state.show_shops
                        ? <div> {this.favourite_shops } </div>
                        : <div/>
                    }
                </div>
                <div>
                    { this.state.show_wish
                        ? <div> {this.wishlist} </div>
                        : <div/>
                    }
                </div>
                <div className="dropdown">
  <button className="dropbtn">Dropdown</button>
  <div className="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
            </div>
        );
  }
}

export default Products;
