import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import MapClass from './map';
import Range from './range';
import {Product} from './product';
import {Shop} from './shop';
import {Categories} from './categories_menu';
import { Navbar, Nav, NavItem, NavLink, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Row,  Col } from 'reactstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {search: null, price: 50, show_map: false, products: [], results: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.only_nearby_shops = this.only_nearby_shops.bind(this);
        this.updateRange = this.updateRange.bind(this);
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    } 
    
    componentWillMount() {
        this.selectedCheckboxes = new Set();
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    componentDidMount() {
      browserHistory.push('/');
    }
  
    only_nearby_shops () {
        //TODO send request
    }
    
    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const s = document.getElementById('search').value;
       
        var temp = this.state.show_map;
        
        var shop = new Shop({name: 'cava1', id: 1, address: 'Athens 1', lat: 37.9738, lgn:23.7275});
        var product = new Product({name: 'pr1', barcode: 12345, price: 12, shop:shop, favourite: true, id: 0});
        this.state.products.push(product);
        this.setState({results: true, show_map: !temp, search: s});
    }
    
    Login() {
        browserHistory.push('/login');
    }
   
    Register() {
        browserHistory.push('/register');
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
            <div className="div_center">
                <img src={"/public/logo_transparent.png"} className="App-logo" alt="logo" />

                <div className="search">
                    <Form id="searching">
                        <FormGroup check inline>
                            <Categories/>
                            <InputGroup>
                                <Input id="search" placeholder="Αναζήτηση με όνομα.."></Input>
                                <InputGroupAddon addonType="append">
                                    <button className="search_btn" id="search_btn" onClick={this.handleSubmit}>
                                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <label> Μέγιστη τιμή </label>
                            <Range range={this.state.price} updateRange={this.updateRange}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label>
                                <Input type="checkbox" id="location_home" onChange={() => this.only_nearby_shops()}/>{' '}
                                Μόνο κοντινά καταστήματα
                            </Label>
                        </FormGroup>
                    </Form>   
                </div>
            </div>
            <div className="map_class">
                    {this.state.results
                    ? <div> {this.state.products.map(product => (
                            <div> {product.name} {product.price}€ 
                            </div>
                        ))}</div>
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