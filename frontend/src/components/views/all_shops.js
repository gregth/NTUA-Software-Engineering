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
import { browserHistory } from 'react-router';
import PapigationShops from '../helper_components/all_shops_papigation';
import { Alert, Container } from 'reactstrap';
import Delete from '../helper_components/delete';
import NavBarClass from '../helper_components/navbar';

export class AllShops extends Component {
    constructor(props) {
        super(props);
        this.state = {error: null, success: null, not_found: null};
        this.homepage = this.homepage.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.delete_complete = this.delete_complete.bind(this);
        this.name = null;
        this.id = null;
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
    
    homepage() {
        browserHistory.push('/');
    }
    
    render() {
        return (
            <div>
                <NavBarClass/>
                <div className="header"></div>
                <Container>
                    <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                    <PapigationShops ref='result' data={this.state.shops} delete={this.delete} edit={this.edit} />
                    <Delete ref='delete' back={this.delete_complete} category="shop" id={this.id} name={this.name}/>
                </Container>
            </div>
        );
    }
};

export default AllShops;
    
