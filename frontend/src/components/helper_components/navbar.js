import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import {Settings} from '../helper_components/dropdown_settings';
import { NavbarBrand, Navbar, Nav, NavItem, NavLink, DropdownMenu, DropdownToggle, ButtonDropdown, DropdownItem } from 'reactstrap';

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
        this.about = this.about.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
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
    
    about () {
        browserHistory.push('/aboutus');
    }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand><img alt="" src={"/logo_transparent.png"} width="150px" onClick={() => this.homepage()}/></NavbarBrand>
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
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret style={{backgroundColor: '#f1f1f1'}} color="transparent" outline>Προσθήκη</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.new_product()}>
                                    Προσθήκη Νέου Προϊόντος
                                </DropdownItem>
                                <DropdownItem onClick={() => this.new_shop()}>
                                    Προσθήκη Νέου Καταστήματος
                                </DropdownItem>
                                <DropdownItem onClick={() => this.newprice()}>
                                    Προσθήκη Νέας Τιμής
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </NavItem>
                    : null
                    }
                    
                    <NavItem>
                        <NavLink onClick={() => this.about()}>Σχετικά με μας</NavLink>
                    </NavItem>
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
                    {Boolean(cookie.load('loggedin'))
                    ? <NavItem><Settings/></NavItem>
                    : null
                    }
                </Nav>
            </Navbar>
        );
    }
}

export default NavBarClass;


