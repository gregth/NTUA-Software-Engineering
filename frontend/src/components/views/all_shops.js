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

import React, { Component } from "react";
import {receive_from_server} from '../communication/receive';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import {Settings} from '../helper_components/dropdown_settings';
import PapigationShops from '../helper_components/all_shops_papigation';
import { Button, Image, Alert } from 'reactstrap';
import Delete from '../helper_components/delete';
import NavBarClass from '../helper_components/navbar';

export class AllShops extends Component {
    constructor(props) {
        super(props);
        this.id = null;
        this.select = this.select.bind(this);
        this.request = this.request.bind(this);
        this.state = {shops: null, error: null, success: null, not_found: null};
        this.homepage = this.homepage.bind(this);
        this.search = this.search.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.delete_complete = this.delete_complete.bind(this);
        this.name = null;
        this.id = null;
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
            shops => {
                this._asyncRequest = null;
                this.setState({shops});
            }
        );
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    async request() {
        const url = 'http://localhost:3002/shops';
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
        
        var shops = await answer.json().then((result) => {return result.shops;});
        console.log(shops);
        this.setState({shops: shops});
        return shops;
    }
    
    edit (id) {
        this.id = id;
        console.log(this.id);
        browserHistory.push({
            pathname: '/edit_shop',
            search: '?id=' + id.toString()
            }
        );
    }
    
    async delete_complete () {
        this.refs.result.setState({ready: false});
        this.refs.delete.closeall();
        this.refs.result.request();
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
        browserHistory.push('/search');
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                <PapigationShops ref='result' data={this.state.shops} select={this.select} delete={this.delete} edit={this.edit} search={this.search}/>
                <Delete ref='delete' back={this.delete_complete} category="shop" id={this.id} name={this.name}/>
            </div>
        );
    }
};

export default AllShops;
    
