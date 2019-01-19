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
        this.params = []
        this.searches = this.props.location.query;
        Object.entries(this.searches).forEach(([key, value]) => {
           this.params.push({key, value});
        });
        this.searches = this. props.location.state;
        console.log(this.searches);
        Object.entries(this.searches).forEach(([key, value]) => {
            if (value !== null && value !== "" ) {
                if (key === 'tags') {
                    if (value.length > 0) this.params.push({key, value});
                }
                else this.params.push({key, value});
            }
        });
        console.log(this.params);
        this.state = {search: null, show_map: false,
                        results: false, success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
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
      
    handleSubmit () {
        this.setState({search: {
                sort_distance: this.refs.search.sort_distance,
                sort_price: this.refs.search.sort_price,
                sort_date: this.refs.search.sort_date,
                datefrom: this.refs.search.datefrom,
                dateto: this.refs.search.dateto,
                category: this.refs.search.category,
                tags: this.refs.search.tags,
                price: this.refs.search.price}});
        console.log(this.state)
        this.setState({ show_map: !this.state.show_map});
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>

                <Search ref="search" handle={this.handleSubmit}/>
                
                <div>
                    
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

export default Results;