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
import {Categories} from './categories_menu';
import { Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Row,  Col } from 'reactstrap';
import Range from './range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {price: 50};
        this.body = null;
        this.only_nearby_shops = this.only_nearby_shops.bind(this);
        
    }
    
    only_nearby_shops () {
        //TODO send request
    }
    
    render() {
        return ( 
            <div>
                <Form id="searching" onSubmit={this.props.handle}>
                    <FormGroup check inline>
                        <Categories ref='search_category'/>
                        <InputGroup>
                            <Input id="search" placeholder="Αναζήτηση με όνομα.."></Input>
                            <InputGroupAddon addonType="append">
                                <button className="search_btn" id="search_btn" type="submit">
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup check row>
                        <Label> Μέγιστη τιμή </Label>
                        <Range range={this.props.price} updateRange={this.props.updateRange}/>
                    </FormGroup>
                    <FormGroup check>
                        <Label>
                            <Input type="checkbox" id="location_home" onChange={() => this.only_nearby_shops()}/>{' '}
                            Μόνο κοντινά καταστήματα
                        </Label>
                    </FormGroup>
                </Form>   
            </div>
        );
    }
};

export default Search;
    

