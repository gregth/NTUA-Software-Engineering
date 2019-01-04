import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import MapClass from './map';
import Range from './range';
import {Product} from './product';
import {Shop} from './shop';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Categories} from './categories_menu';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {search: [], price: 50, show_map: false, products: [], results: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.only_nearby_shops = this.only_nearby_shops.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.selectedCheckboxes = new Set();  
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
    
    componentWillMount() {
        this.selectedCheckboxes = new Set();
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    componentDidMount() {
      browserHistory.push('/');
    }
    
    toggleCheckbox (label, event){
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } 
        else {
            this.selectedCheckboxes.add(label);
        }
    }
  
    only_nearby_shops () {
        //TODO send request
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
    
    Login() {
        browserHistory.push('/login');
    }
   
    Register() {
        browserHistory.push('/register');
    }
    
    render() {
      return (
        <div> 
            <button className="btn" type="submit" id="button1" onClick={() => this.Login()}>Σύνδεση</button>
            <button className="btn" type="submit" id="button2" onClick={() => this.Register()}>Εγγραφή</button>
            <img src={"/public/logo_transparent.png"} className="App-logo" alt="logo" />
            <div className="search">
                    <form id="searching">
                        <Categories/>
                        <input id="search" type="text" placeholder="Search.." name="search"></input>
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