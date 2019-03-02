import React, { Component } from "react";
import {Categories} from './categories_menu';
import { FormText, Table, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Container, Col } from 'reactstrap';
import Range from './range';
import SortPrice from '../helper_components/sort_price';
import SortDistance from '../helper_components/sort_distance';
import SortDate from '../helper_components/sort_date';

function onlyUnique (value, index, self) { 
    return self.indexOf(value) === index;
}

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {price: 50, params: null, geodist: null, tags: null};
        this.updateRange = this.updateRange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filters = this.filters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sort_distance = null;
        this.sort_date = null;
        this.sort_price = null;
        this.category = null;
        this.geodist = null;
        this.datefrom = null;
        this.dateto = null;
        this.price = 50;      
    }
    
    componentDidMount() {
        if (this.props.params) {
            if (this.props.params.geodist) this.setState({geodist: this.props.params.geodist});
            if (this.props.params.tags) this.setState({tags: this.props.params.tags.join(', ')});
            
            if (this.props.params.price) {
                this.price = this.props.params.price;
                this.setState({price: this.props.params.price});
            }
        }
    }
    
    filters () {
        this.sort_distance = this.refs.sort_distance.sort;
        this.sort_date = this.refs.sort_date.sort;
        this.sort_price = this.refs.sort_price.sort;
        if ( this.refs.search_category.state.category === 'Όλες οι κατηγορίες'){
            this.category = null;
        }
         else{
             this.category = this.refs.search_category.state.category;
         }
        this.geodist = document.getElementById('search_geodist').value;
        this.datefrom = document.getElementById('search_datefrom').value;
        this.dateto = document.getElementById('search_dateto').value;
        this.props.handle();
    }
    
    handleChange(event) {
        var name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    updateRange (val) {
        this.setState({
            price: val
        });
        this.price = val;
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
        if (this.props.params) {
            if (this.props.params.datefrom){
                var from = new Date(this.props.params.datefrom);
                var datefrom = from.toISOString().substr(0,10);
            }
            if (this.props.params.dateto) {
                var to = new Date(this.props.params.dateto);
                var dateto = to.toISOString().substr(0,10);
            }
        }
        var curr = new Date();
        curr.setUTCDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        return ( 
            <div>
                  <hr></hr>
                  <hr></hr>
                <Container className="Search">
              
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Επιλογή Κατηγορίας</th>
                            <th>Ταξινόμηση απόστασης:</th>
                            <th>Ταξινόμηση ημερομηνίας:</th>
                            <th>Ταξινόμηση τιμής:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Categories ref='search_category' default={this.props.params ? this.props.params.category : null}/></td>
                            <td><SortDistance ref="sort_distance" default={this.props.params ? this.props.params.sort_distance : null}/></td>
                            <td><SortDate ref="sort_date" default={this.props.params ? this.props.params.sort_date : null}/></td>
                            <td><SortPrice ref="sort_price" default={this.props.params ? this.props.params.sort_price : null}/></td>
                        </tr>
                    </tbody>
                </Table>
                
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Ημερομηνία από:</th>
                            <th>Ημερομηνία έως:</th>
                            <th>Απόσταση:</th>
                            <th>Μέγιστη τιμή:</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Input type="date" id="search_datefrom" name="datefrom" defaultValue={this.props.params && datefrom ? datefrom : date} /></td>
                            <td><Input type="date" id="search_dateto" name="dateto" defaultValue={this.props.params && dateto ? dateto : date} /></td>
                            <td>
                              
                                    <InputGroup>
                                        <Input type="text" id="search_geodist" pattern="[0-9]+" name="geodist" onChange={this.handleChange} value={this.state.geodist ? this.state.geodist : ''}/>
                                        <InputGroupAddon addonType="append">km</InputGroupAddon>
                                    </InputGroup>
                                
                            </td>
                            <td>
                            
                                <Range range={this.state.price} updateRange={this.updateRange}/>
                                
                            </td>
                            <td><Button onClick={this.filters}>Εφαρμογή φίλτρων</Button></td>
                        </tr>
                    </tbody>
                </Table>
                </Container>
                <Form>
                    <FormGroup>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>

                        <InputGroup>
                            <Input id="search_tags" placeholder="Αναζήτηση με όνομα ή χαρακτηριστικά.." name="tags" onChange={this.handleChange} value={this.state.tags ? this.state.tags : ''}></Input>
                            <InputGroupAddon addonType="append">
                                <Button className="btn btn-default" id="search_btn" onClick={this.handleSubmit}>search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <FormText>Διαχωρισμός χαρακτηριστικών με κόμμα (,)</FormText>
                        </Col>

                    </FormGroup>
                </Form> 
            </div>
        );
    }
};

export default Search;
    

