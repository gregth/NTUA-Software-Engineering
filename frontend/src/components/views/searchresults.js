import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import MapClass from '../helper_components/map';
import cookie from 'react-cookies';
import { Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Alert } from 'reactstrap';
import PricesTable from '../helper_components/results_prices';
import Search from '../helper_components/searchComponent';
import NavBarClass from '../helper_components/navbar';

class Results extends Component {
    constructor(props) {
        super(props);
        this.shops = [];
        this.products = [];
        this.searches = this.props.location.query;
        Object.entries(this.searches).forEach(([key, value]) => {
           if (key === 'products') this.products.push([value]);
           if (key === 'shops') this.shops.push([value]);
        });
        if (this.props.location.state) {
            this.state = {shops: this.shops, products: this.products, search: this.props.location.state, show_map: false,
                        results: false, success: null, error: null, not_found: null};
        }
        else {
            this.state = {shops: this.shops, products: this.products, search: null, 
                        results: false, success: null, error: null, not_found: null};
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.request_prices = this.request_prices.bind(this);
        this._isMounted = null;
        
    }
    
    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    request_prices () {
        console.log(this.refs.results_products.id);
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
      
    async handleSubmit () {
        this._isMounted = await this.setState({search: {
                sort_distance: this.refs.search.sort_distance,
                sort_price: this.refs.search.sort_price,
                sort_date: this.refs.search.sort_date,
                datefrom: this.refs.search.datefrom,
                dateto: this.refs.search.dateto,
                category: this.refs.search.category,
                tags: this.refs.search.tags,
                price: this.refs.search.price,
                geodist: this.refs.search.geodist }});
        this.refs.result.refresh();
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>

                <Search ref="search" params={this.state.search} handle={this.handleSubmit}/>

                <PricesTable ref="result" params={this.state.search} shops={this.state.shops} products={this.state.products}/>

            </div>
        );
    }
}

export default Results;