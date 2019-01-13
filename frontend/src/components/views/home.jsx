import React, { Component } from "react";
import { browserHistory } from 'react-router';
import MapClass from '../helper_components/map';
import {Categories} from '../helper_components/categories_menu';
import { Navbar, Nav, NavItem, NavLink, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Row,  Col, Table, Alert } from 'reactstrap';
import {send_to_server} from '../communication/send';
import {receive_from_server} from '../communication/receive';
import ProductsTable from '../helper_components/results_products_table';
import Search from '../helper_components/searchComponent';
import cookie from 'react-cookies';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {price: 50, show_map: false, products: [], results: false, success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.request_prices = this.request_prices.bind(this);
        this.updateRange = this.updateRange.bind(this);
    }
    
    request_prices () {
        console.log(this.refs.results_products.id);
    }
 
    
    homepage() {
        browserHistory.push('/');
    }
    
    componentDidMount() {
         try {
            cookie.remove('need_login', {path: '/'});
            var loggedin = Boolean(cookie.load('loggedin'));
            if (loggedin) {
                browserHistory.push('/search');
            }
        }
        catch(error) {
            console.log(error);
        }
    }
  
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const search = document.getElementById('search').value;
        const category = this.refs.search.refs.search_category.state.category;
        
        var body = {
            search,
            category
        };
        
        console.log(body);
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
        
        var products = await answer.json().then((result) => {return result.products});
        console.log(products);
        
        this.setState({results: true, show_map: !this.state.show_map, products: products});
    }
    
    Login() {
        browserHistory.push('/login');
    }
   
    Register() {
        browserHistory.push('/register');
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
    
    render() {
      return (
        <div>
            <Navbar light expand="md">
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink onClick={() => this.Login()}>Σύνδεση</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => this.Register()}>Εγγραφή</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
            <div className="front-img">
            <div className="App-logo">
                <img src={"/public/logo_transparent.png"} alt="logo" />
                <Search ref="search" price={this.state.price} handle={this.handleSubmit} updateRange={this.updateRange}/>
            </div>
            </div>
            <div>
                {this.state.results
                ? <ProductsTable ref="results_products" max_price={this.state.price} products={this.state.products} onClick={this.request_price}/>
                : null
                }
                <div >
                    {this.state.show_map
                        ?<MapClass/>
                        : null
                    }
                </div>
            
            </div>
        </div>

          );
    }
}