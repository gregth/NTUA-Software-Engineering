/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faTimes, faShoppingBasket, faBuilding, faUser, faBars} from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import Slider from 'react-rangeslider';
import MapClass from './map';
import Range from './range';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class Search extends React.Component {
 
     constructor(props) {
        super(props);
        this.state = {search: [], price: 50, show_map: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.show_map = this.show_map.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.logoff = this.logoff.bind(this);        
        this.delete = this.delete.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.newproduct = this.newproduct.bind(this);
        this.newshop = this.newshop.bind(this);
        this.favourite_products = this.favourite_products.bind(this);
    }
    
    updateRange(val) {
        this.setState({
            price: val
        });
    } 
    
    componentWillMount() {
        this.selectedCheckboxes = new Set();
    }
    
    logoff() {
        browserHistory.push('/');
    }
    
    newproduct() {
        browserHistory.push('/addproduct');
    }
    
    newshop() {
        browserHistory.push('/addshop');
    }
    
    delete() {
        //TODO 
        browserHistory.push('/');
    }
    
    favourite_products () {
        browserHistory.push('/products');
    }
    
    toggleCheckbox(label){
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } 
        else {
            this.selectedCheckboxes.add(label);
        }
    }
  
    show_map() {
        var temp = this.state.show_map;
        this.setState(() => ({ show_map: !temp}));
    }
        
    handleSubmit () {
        const s = document.getElementById('search').value;
       
        if (s !== '') {
            this.selectedCheckboxes.add(s);
        }
        
        this.setState(() => ({search: this.selectedCheckboxes}));
    }
    
    render() {
        return (
            <div>
                <div className="dropdown">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars}></FontAwesomeIcon> Username</button>
                    <div className="dropdown-content">
                        <div href="#">Wishlist</div>
                        <div onClick={() => this.favourite_products()}>Αγαπημένα Προϊόντα</div>
                        <div href="#">Αγαπημένα Καταστήματα</div>
                        <div onClick={() => this.delete()}>Απενεργοποίηση Λογαριασμού</div>
                        <div onClick={() => this.logoff()}>Αποσύνδεση</div>
                    </div>
                </div>
                <button className="new" id="new_product" type="submit" onClick={() => this.newproduct()}><FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> Προσθήκη Νέου Προϊόντος </button>
                <button className="new" id="new_shop" type="submit" onClick={() => this.newshop()}><FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> Προσθήκη Νέου Καταστήματος </button>
                <br/>
                <div className="search">
                    <h1> Αναζήτηση Προϊόντων </h1>
                    <form id="searching" onSubmit={() => this.handleSubmit()}>
                        <label> Κρασί </label>
                        <input type="checkbox" name="product" value="wine" onChange={() => this.toggleCheckbox("Κρασί")}></input>
                        <label> Μπύρες </label>
                        <input type="checkbox" name="product" value="beer" onChange={() => this.toggleCheckbox("Μπύρες")}></input>
                        <label> Βότκα </label>
                        <input type="checkbox" name="product" value="vodka" onChange={() => this.toggleCheckbox("Βότκα")}></input>
                        <label> Ουίσκι </label>
                        <input type="checkbox" name="product" value="whiskey" onChange={() => this.toggleCheckbox("Ουίσκι")}></input>
                        <label> Ρούμι </label>
                        <input type="checkbox" name="product" value="Rum" onChange={() => this.toggleCheckbox("Ρούμι")}></input>
                        <br/><br/>
                        <label> Gin </label>
                        <input type="checkbox" name="product" value="Gin" onChange={() => this.toggleCheckbox("Gin")}></input>
                        <label> Τεκίλα </label>
                        <input type="checkbox" name="product" value="Tequila" onChange={() => this.toggleCheckbox("Τεκίλα")}></input>
                        <label> Αναψυκτικά </label>
                        <input type="checkbox" name="product" value="beverages" onChange={() => this.toggleCheckbox("Αναψυκτικά")}></input>
                        <label> Snacks </label>
                        <input type="checkbox" name="product" value="snancks" onChange={() => this.toggleCheckbox("Snacks")}></input>
                        <label> Χωρίς Αλκοόλ </label>
                        <input type="checkbox" name="product" value="nonalchool" onChange={() => this.toggleCheckbox("Χωρίς Αλκοόλ")}></input>
                        <br/>
                        <input id="search" type="text" placeholder="Search.." name="search"></input>
                        <button className="search_btn" id="search_btn" type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                        <br/><br/>
                        <label> Μέγιστη τιμή </label>
                        <Range range={this.state.price} updateRange={this.updateRange}/>
                        <br/>
                        <label> Only nearby shops</label>
                        <input type="checkbox" name="location" onChange={() => this.show_map()}></input>
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