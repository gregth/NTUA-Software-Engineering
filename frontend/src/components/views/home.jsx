import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import MapClass from '../helper_components/map';
import cookie from 'react-cookies';
import { Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Alert } from 'reactstrap';
import ProductsTable from '../helper_components/results_products_table';
import Search from '../helper_components/searchComponent';
import NavBarClass from '../helper_components/navbar';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {price: 50, show_map: false,
                        results: false, success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.only_nearby_shops = this.only_nearby_shops.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.request_prices = this.request_prices.bind(this);
        
    }
    
    request_prices () {
        console.log(this.refs.results_products.id);
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
      
    only_nearby_shops () {
        //TODO send request
    }
    
    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        
        this.setState({results: true, show_map: !this.state.show_map});
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                
                <div className="header">
                    <img src={"/public/logo_transparent.png"} alt="logo" />
                </div>
                
                <Search ref="search" price={this.state.price} handle={this.handleSubmit} updateRange={this.updateRange}/>
                
                <div>
                    {this.state.results
                    ? <ProductsTable ref="results_products" category={this.refs.search.refs.search_category.state.category} max_price={this.state.price} products={this.state.products} onClick={this.request_price}/>
                    : null
                    }
                    <div >
                        {this.state.show_map && false
                            ?<MapClass/>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPage;