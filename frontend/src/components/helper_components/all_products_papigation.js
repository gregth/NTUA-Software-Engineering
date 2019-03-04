import Description from './product_description';
import { Input, Table, Label, Row, Form, FormGroup, Col, Pagination, PaginationItem, PaginationLink, Button, Alert } from 'reactstrap';
import React from "react";
import { browserHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';
import SortDropdown from '../helper_components/sort_products_shops';
import StatusDropdown from '../helper_components/status_products_shops';
import CountDropdown from '../helper_components/count_products_shops';
import cookie from 'react-cookies';

const options = [
            {name: 'Άλλο', value: 'all'},
            {name: 'Αναψυκτικά', value: 'beverages'},
            {name: 'Χωρίς Αλκοόλ', value: 'nonalchool'},
            {name: 'Βότκα', value: 'vodka'},
            {name: 'Κονιάκ', value: 'koniak'},
            {name: 'Τζιν', value: 'gin'},
            {name: 'Κρασί', value: 'wine'},
            {name: 'Λικέρ', value: 'liquer'},
            {name: 'Μπύρες', value: 'beer'},
            {name: 'Ούζο', value: 'ouzo'},
            {name: 'Ουίσκι', value: 'whiskey'},
            {name: 'Ρούμι', value: 'rum'},
            {name: 'Τεκίλα', value: 'tequila'},
            {name: 'Τσίπουρο', value: 'tsipouro'},
            {name: 'Σνακς', value: 'snacks'}           
        ];
        
export default class ProductsResults extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.createData = this.createData.bind(this);
        this.request = this.request.bind(this);
        this.sortChoose = this.sortChoose.bind(this);
        this.statusChoose = this.statusChoose.bind(this);
        this.countChoose = this.countChoose.bind(this);
        this.search = this.search.bind(this);
        this.search_product = this.search_product.bind(this);
        this.category_to_greek = this.category_to_greek.bind(this);
        this.state = {
            error_message: null, noproducts: null, tooltipOpen: false, currentPage: 0, error: null, success: null, not_found: null, ready: null, message: null
        };
        this._asyncRequest = null;
        this._isMounted = null;
        this.dataSet = null;    
        this.pagesCount = null;
        this.pageSize = 20;
        this.sort = 'id|DESC';
        this.status = 'ACTIVE';
        this.start = 0;
        this.total = null;
        this.products = null;
        this.selected_products = [];
        this.request();
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    category_to_greek (category) {
        var name = null;
        for (var i in options) {
            if (options[i].value === category) name = options[i].name; 
        }
        return name;
    }
    
    createData () {
        this.dataSet = this.products.map(product => (
            <tr key={product.id} className="row_pointer">
                <td>{product.name}</td>
                <td>{this.category_to_greek(product.category)}</td>
                <td>{product.extraData.brand}</td>
                <td>
                    {product.extraData.volume
                    ?<div>{product.extraData.volume}ml</div>
                    : <div>-</div>
                    }
                </td>
                <td>{product.tags.join(', ')}</td>
                <td>
                    {!product.withdrawn
                    ? <div>Ενεργό</div>
                    : <div>Αποσυρθέν</div>
                    }
                </td>
                <td>
                    <Description id={product.id} text={product.description}/>
                </td>
                <td>
                    {Boolean(cookie.load('loggedin'))
                    ? <button className="search_btn" id="edit_btn" onClick={() => this.props.edit(product.id)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                    : null
                    }
                    {Boolean(cookie.load('loggedin'))
                    ? <button className="search_btn" id="delete_btn" onClick={() => this.props.delete(product.id, product.name)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>     
                    : null
                    }
                    <button className="search_btn" id="search_product_btn" onClick={() => this.search_product(product.id)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                </td>
                <td><Input type="checkbox" id={'product'+product.id} onChange={() => this.handleChange(product.id)}></Input></td>
            </tr>
        ));
    } 
    
    search_product (id) {
        browserHistory.push({
            pathname: '/results',
            search: '?products=' + id.toString()
        });
    }
    
    search () {
        this.setState({ success: null, not_found: null, error: null, message: null, error_message: null, not_found2: null, message2: null });
        if (this.selected_products.length === 0) {
            this.setState({noproducts: true});
            return;
        }
        browserHistory.push({
            pathname: '/results',
            search: '?products=' + this.selected_products.join('&products=')
        });
    }
    
    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    
    handleChange(id) {
        if (this.selected_products.includes(id)) {
            var index = this.selected_products.indexOf(id);
            if (index > -1) {
                this.selected_products.splice(index, 1);
            }
        }
        else {
            this.setState({noproducts: false});
            this.selected_products.push(id);
        }
        this.setState({selected_products: this.selected_products});
        this.setState({ready: true});
    }
    
    async request () {   
        this.selected_products = [];
        console.log(this.state)
        if (this.state) {
            this.setState({ success: null, not_found: null, error: null, message: null, error_message: null, not_found2: null, message2: null });
        }
        const url = '/products?start=' + this.start + 
                    '&count=' +  this.pageSize + '&sort=' + this.sort +
                    '&status=' + this.status;
        this._asyncRequest = await receive_from_server(url);
        const answer = this._asyncRequest;
        
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Not Found', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Not Authorized', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Forbidden', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Bad Request', not_found: true});
                return;
            }
            else {
                this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
        
        var result = await answer.json().then((result) => {return result;});
        console.log(result);
        if (this.start !== result.start || parseInt(this.pageSize) !== result.count) {
            this.setState({error: true, success: false});
            return;
        }
        
        this.total = result.total;
        this.products = result.products;
        this.pagesCount = Math.ceil(this.total / this.pageSize);
        this.createData();
        this.setState({ready: true});
    }
    
    async handleClick(e, index) {
        e.preventDefault();
        this.start = index*this.pageSize;
        this._isMounted = await this.request();
        
        this.setState({
            currentPage: index
        });
    }
    
    async sortChoose () {
        this.setState({ready: false});
        this.sort = this.refs.sort.sort;
        this._isMounted = await this.request();
    }
    
    async statusChoose () {
        this.setState({ready: false});
        this.status = this.refs.status.status;
        this._isMounted = await this.request();
    }
    
    async countChoose () {
        this.setState({ready: false});
        this.pageSize = this.refs.count.count;
        this._isMounted = await this.request();
    }
    
    render() {
        const { currentPage } = this.state;
        return ( 
            <Row>
                <React.Fragment>
                <Col className="sidebar" md="3">
                    <Form>
                        <FormGroup>
                            <Label for="sort">Ταξινόμηση κατά:</Label>
                            <SortDropdown ref="sort" click={this.sortChoose}/>
                            </FormGroup>
                        <FormGroup>
                            <Label for="status">Προϊόντα προς εμφάνιση:</Label>
                            <StatusDropdown ref="status" click={this.statusChoose}/>
                            </FormGroup>
                        <FormGroup>
                            <Label for="count">Προϊόντα ανά σελίδα:</Label>
                            <CountDropdown ref="count" click={this.countChoose}/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md="9">
                    <FormGroup>
                        <Button className="btn-block" onClick={this.search}> Αναζήτηση τιμών επιλεγμένων προϊόντων</Button>
                    </FormGroup>
                    <Alert color="danger" isOpen={this.state.noproducts===true}>Δεν έχει επιλεχθεί κανένα προϊόν.</Alert> 
                    <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                    <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                    {!this.state.ready
                    ?<div> Loading... {this.state.ready} </div>
                    :<div>
                    {this.dataSet.length > 0
                    ? 
                    <React.Fragment>
                    <div class="main-content">   
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Όνομα Προϊόντος</th>
                                    <th>Κατηγορία</th>
                                    <th>Μάρκα</th>
                                    <th>Όγκος</th>
                                    <th>Χαρακτηριστικά</th>
                                    <th>Κατάσταση</th>
                                    <th>Περιγραφή</th>
                                </tr>
                            </thead>
                            {this.dataSet.map((data, i) => 
                            <tbody className="data-slice" key={i}>
                                {data}
                            </tbody>

                            )}
                        </Table>
                    </div>
                    <div className="pagination-wrapper">          
                        <Pagination aria-label="Page navigation example">            
                            <PaginationItem disabled={currentPage <= 0}>              
                                <PaginationLink
                                    onClick={e => this.handleClick(e, currentPage - 1)}
                                    previous
                                    href="#"
                                />              
                            </PaginationItem>
                            {[...Array(this.pagesCount)].map((page, i) => 
                                <PaginationItem active={i === currentPage} key={i}>
                                    <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                                <PaginationLink
                                    onClick={e => this.handleClick(e, currentPage + 1)}
                                    next
                                    href="#"
                                />
                            </PaginationItem>
                        </Pagination>
                        </div>
                    </React.Fragment>
                    : <div>Δε βρέθηκαν αποτελέσματα.</div>
                    }
                </div>
                }
            
          </Col>
        </React.Fragment>
        </Row>
    );
  }  
}