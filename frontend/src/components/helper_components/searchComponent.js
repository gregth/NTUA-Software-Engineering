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
import { FormText, Table, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Row,  Col } from 'reactstrap';
import Range from './range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import SortDropdown from '../helper_components/sort_products_shops';

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function onlyUnique (value, index, self) { 
    return self.indexOf(value) === index;
}

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {price: 50};
        this.updateRange = this.updateRange.bind(this); 
        this.filters = this.filters.bind(this);
        this.sort_distance = null;
        this.sort_date = null;
        this.sort_price = null;
        this.category = null;
        this.geodist = null;
        this.datefrom = null;
        this.dateto = null;
        
    }
    
    filters () {
        this.sort_distance = this.refs.sort_distance.sort;
        this.sort_date = this.refs.sort_date.sort;
        this.sort_price = this.refs.sort_price.sort;
        this.category = this.refs.search_category.category;
        this.geodist = document.getElementById('search_geodist').value;
        this.datefrom = document.getElementById('search_datefrom').value;
        this.dateto = document.getElementById('search_dateto').value;
        this.props.handle();
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
        this.props.handle();
    }
    
    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        
        var tags_list = (document.getElementById('search_tags').value).split(',');
        
        var tags = [];
        tags_list = tags_list.filter(onlyUnique);
        for (var i=0; i<tags_list.length; i++) {
            var temp = tags_list[i].replace(/\s+/g,' ').trim();
            if (temp === "") continue;
            tags.push(temp);
        }

        tags = tags.filter( onlyUnique );
        if (tags.length > 0) {
            if (tags[0] === "") {
                tags = [];
            }
        }
        
        this.tags = tags;
        this.filters();
    }
    
    render() {
        return ( 
            <div>
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Επιλογή Κατηγορίας</th>
                            <th>Ταξινόμηση απόστασης:</th>
                            <th>Ταξινόμηση ημερομηνίας:</th>
                            <th>Ταξινόμηση τιμής:</th>
                            <th>Ημερομηνία από:</th>
                            <th>Ημερομηνία έως:</th>
                            <th>Απόσταση:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Categories ref='search_category'/></td>
                            <td><SortDropdown ref="sort_distance"/></td>
                            <td><SortDropdown ref="sort_date"/></td>
                            <td><SortDropdown ref="sort_price"/></td>
                            <td><Input type="date" id="search_datefrom"/></td>
                            <td><Input type="date" id="search_dateto"/></td>
                            <td>
                                <Col sm={5}>
                                    <InputGroup>
                                        <Input type="text" id="search_geodist" pattern="[0-9]+" name="geodist" onChange={this.geodist}/>
                                        <InputGroupAddon addonType="append">km</InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </td>
                        </tr>
                        <tr>
                            <td><Button onClick={this.filters}>Εφαρμογή φίλτρων</Button></td>
                        </tr>
                    </tbody>
                </Table>
                
                <Form onSubmit={this.props.handle}>
                    <FormGroup>
                        <InputGroup>
                            <Input id="search_tags" placeholder="Αναζήτηση με όνομα ή χαρακτηριστικά.."></Input>
                            <InputGroupAddon addonType="append">
                                <span className="input-group-btn">
                                    <Button className="btn btn-default" id="search_btn" type="submit">
                                      <i>search</i>
                                    </Button>
                                </span>
                            </InputGroupAddon>
                        </InputGroup>
                        <FormText>Διαχωρισμός χαρακτηριστικών με κόμμα (,)</FormText>
                    </FormGroup>

                    <FormGroup check row>
                        <Label> Μέγιστη τιμή </Label>
                        <Range range={this.state.price} updateRange={this.updateRange}/>
                    </FormGroup>
                </Form> 
            </div>
        );
    }
};

export default Search;
    

