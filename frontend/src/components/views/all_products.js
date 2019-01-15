/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import {Settings} from '../helper_components/dropdown_settings';
import PapigationResults from '../helper_components/all_products_papigation';
import { Button, NavbarBrand, Image, Alert } from 'reactstrap';
import Delete from '../helper_components/delete';
import NavBarClass from '../helper_components/navbar';

export class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.id = null;
        this.select = this.select.bind(this);
        this.state = {products: null, error: null, success: null, not_found: null};
        this.homepage = this.homepage.bind(this);
        this.search = this.search.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.delete_complete = this.delete_complete.bind(this);
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
    }
    
    delete_complete () {
        this.setState({products: false});
        this.refs.delete.closeall();
        this.setState({products: true});
    }
    
    edit (id) {
        this.id = id;
        console.log(this.id);
        browserHistory.push({
            pathname: '/edit_product',
            search: '?id=' + id.toString()
            }
        );
    }
    
    delete (id, name) {
        this.refs.delete.toggle_delete(id, name);
    }
    
    search (id) {
        this.id = id;
        console.log(this.id);
    }
    
    select (id) {
        this.id = id;
        console.log(this.id);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                <PapigationResults select={this.select} delete={this.delete} edit={this.edit} search={this.search}/>
                <Delete ref='delete' back={this.delete_complete} category="product" id={this.id} name={this.name}/>
            </div>
        );
    }
};

export default AllProducts;
    
