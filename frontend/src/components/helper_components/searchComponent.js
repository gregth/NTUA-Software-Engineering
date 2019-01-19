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
import { Table, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Row,  Col } from 'reactstrap';
import Range from './range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import SortDropdown from '../helper_components/sort_products_shops';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {price: 50};
        this.body = null;
        this.geodist = this.geodist.bind(this);
        this.updateRange = this.updateRange.bind(this); 
    }
    
    geodist () {
        //TODO send request
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
    }
    
    render() {
        return ( 
            <div>
                <Table style={{width: '70%'}} borderless>
                    <thead>
                        <tr>
                            <th style={{width: '18%'}}>Επιλογή Κατηγορίας</th>
                            <th style={{width: '18%'}}>Ταξινόμηση απόστασης:</th>
                            <th style={{width: '18%'}}>Ταξινόμηση ημερομηνίας:</th>
                            <th style={{width: '18%'}}>Ταξινόμηση τιμής:</th>
                            <th style={{width: '9'}}>Ημερομηνία από:</th>
                            <th style={{width: '9%'}}>Ημερομηνία έως:</th>
                            <th style={{width: '10%'}}>Απόσταση:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Categories ref='search_category'/></td>
                            <td><SortDropdown ref="sort" click={this.sortChoose}/></td>
                            <td><SortDropdown ref="sort" click={this.sortChoose}/></td>
                            <td><SortDropdown ref="sort" click={this.sortChoose}/></td>
                            <td><Input type="date" id="search_datefrom"/></td>
                            <td><Input type="date" id="search_dateto"/></td>
                            <td>
                                <InputGroup>
                                    <Input type="text" id="search_geodist" pattern="[0-9]+" name="geodist" onChange={this.geodist}/>
                                    <InputGroupAddon addonType="append">km</InputGroupAddon>
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Button>Εφαρμογή φίλτρων</Button></td>
                        </tr>
                    </tbody>
                </Table>
                <Form id="searching" onSubmit={this.props.handle}>
                    <FormGroup check inline>
                        <InputGroup>
                            <div className="col-sm-12 pull-center well">
                                <div className="input-group custom-search-form">
                                    <Input id="search" className="form-control" placeholder="Αναζήτηση με όνομα.."></Input>
                                    <InputGroupAddon addonType="append">
                                        <span className="input-group-btn">
                                            <Button className="btn btn-default" id="search_btn" type="submit">
                                              <i>search</i>
                                            </Button>
                                        </span>
                                    </InputGroupAddon>
                                </div>
                            </div>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup check row>
                        <Label> Μέγιστη τιμή </Label>
                        <Range range={this.props.price} updateRange={this.updateRange}/>
                    </FormGroup>
                </Form> 
            </div>
        );
    }
};

export default Search;
    

