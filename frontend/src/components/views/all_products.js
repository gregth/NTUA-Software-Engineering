/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import {receive_from_server} from '../communication/receive';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import PapigationResults from '../helper_components/all_products_papigation';

export class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.id = null;
        this.select = this.select.bind(this);
        this.request = this.request.bind(this);
        this.state = {products: null};
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
            products => {
                this._asyncRequest = null;
                this.setState({products});
            }
        );
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    async request() {
        const url = 'http://localhost:3002/products';
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
        
        var products = await answer.json().then((result) => {return result.products;});
        console.log(products);
        this.setState({products: products});
        return products;
    }
        
    select (id) {
        this.id = id;
        console.log(this.id);
    }
    
    render() {
        if (this.state.products === null) {
            return (<div> Loading </div>);
        }
        else {
            return (<PapigationResults data={this.state.products} select={this.select}/>);
        }
    }
};

export default AllProducts;
    
