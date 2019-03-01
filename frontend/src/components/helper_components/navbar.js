/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {Settings} from '../helper_components/dropdown_settings';
import { NavbarBrand, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

class NavBarClass extends React.Component {
    constructor(props) {
        super(props);
        this.products = this.products.bind(this);
        this.new_product = this.new_product.bind(this);
        this.new_shop = this.new_shop.bind(this);
        this.shops = this.shops.bind(this);
        this.newprice = this.newprice.bind(this);
        this.homepage = this.homepage.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    
    homepage () {
        browserHistory.push('/');
    }
    
    login () {
        browserHistory.push('/login');
    }
    
    register() {
        browserHistory.push('/register');
    }
    
    newprice () {
        browserHistory.push('/addprice');
    }
    
    shops () {
        browserHistory.push('/shops');
    }
    
    products () {
        browserHistory.push('/products');
    }
    
    new_product () {
        browserHistory.push('/newproduct');
    }
    
    new_shop () {
        browserHistory.push('/addshop');
    }
  
    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand><img alt="" src={"/public/logo_transparent.png"} width="150px" onClick={() => this.homepage()}/></NavbarBrand>
                <Nav className="ml-auto" navbar >
                    <NavItem>
                        <NavLink onClick={() => this.products()}> Προϊόντα </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => this.shops()}> Καταστήματα </NavLink>
                    </NavItem>
                    {Boolean(cookie.load('loggedin'))
                    ?
                    <NavItem>
                        <NavLink onClick={() => this.new_product()}> Προσθήκη Νέου Προϊόντος</NavLink>
                    </NavItem>
                    : null
                    }
                    {Boolean(cookie.load('loggedin'))
                    ?
                    <NavItem>
                        <NavLink onClick={() => this.new_shop()}> Προσθήκη Νέου Καταστήματος</NavLink>
                    </NavItem>
                    : null
                    }
                    {Boolean(cookie.load('loggedin'))
                    ?
                    <NavItem>
                        <NavLink onClick={() => this.newprice()}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Προσθήκη Νέας Τιμής</NavLink>
                    </NavItem>
                    : null
                    }
                    {Boolean(cookie.load('loggedin'))
                    ? <NavItem><Settings/></NavItem>
                    : null
                    }
                    {!Boolean(cookie.load('loggedin'))
                    ? <NavItem>
                        <NavLink onClick={() => this.login()}> Σύνδεση </NavLink>
                    </NavItem>
                    : null
                    }
                    {!Boolean(cookie.load('loggedin'))
                    ?<NavItem>
                        <NavLink onClick={() => this.register()}> Εγγραφή </NavLink>
                    </NavItem>
                    : null
                    }
                </Nav>
            </Navbar>
        );
    }
}

export default NavBarClass;


