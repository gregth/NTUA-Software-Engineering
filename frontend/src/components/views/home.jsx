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
import ProductsTable from '../helper_components/results_products_table';
import Search from '../helper_components/searchComponent';
import NavBarClass from '../helper_components/navbar';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        
        browserHistory.push({
            pathname: '/search',
            search: null
        });
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                <div className="header"><img src={"/public/logo_transparent.png"} alt="logo" /></div>
                
                <Search ref="search" handle={this.handleSubmit} />
            </div>
        );
    }
}

export default SearchPage;