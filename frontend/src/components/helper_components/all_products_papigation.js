/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Description from './product_description';
import { Input, Table, Pagination, PaginationItem, PaginationLink, Tooltip, Button } from 'reactstrap';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';
import SortDropdown from '../helper_components/sort_products_shops';
import StatusDropdown from '../helper_components/status_products_shops';
import CountDropdown from '../helper_components/count_products_shops';

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
        this.state = {
            tooltipOpen: false, currentPage: 0, error: null, success: null, not_found: null, ready: null
        };
        this._asyncRequest = null;
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
    }
    
    createData () {
        this.dataSet = this.products.map(product => (
            <tr key={product.id} className="row_pointer">
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td></td>
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
                    <button className="search_btn" id="edit_btn" onClick={() => this.props.edit(product.id)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                    <button className="search_btn" id="delete_btn" onClick={() => this.props.delete(product.id, product.name)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>     
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
        const url = 'http://localhost:3002/products?start=' + this.start + 
                    '&count=' +  this.pageSize + '&sort=' + this.sort +
                    '&status=' + this.status;
        this._asyncRequest = await receive_from_server(url);
        const answer = this._asyncRequest;
        
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
        var result = await answer.json().then((result) => {return result;});
        console.log(result);
        if (this.start !== result.start || parseInt(this.pageSize) !== result.count) {
            this.setState({not_found: true, success: false});
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
            <div>
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Ταξινόμηση κατά:</th>
                            <th>Προϊόντα προς εμφάνιση:</th>
                            <th>Προϊόντα ανά σελίδα:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><SortDropdown ref="sort" click={this.sortChoose}/></td>
                            <td><StatusDropdown ref="status" click={this.statusChoose}/></td>
                            <td><CountDropdown ref="count" click={this.countChoose}/></td>
                            <td><Button onClick={this.search}> Αναζήτηση τιμών επιλεγμένων προϊόντων</Button></td>
                        </tr>
                    </tbody>
                </Table>
                {!this.state.ready
                ?<div> Loading... {this.state.ready} {this.products} </div>
                :<div>
                {this.dataSet.length > 0
                ? <React.Fragment>   
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Όνομα Προϊόντος</th>
                                <th>Κατηγορία</th>
                                <th>Μάρκα</th>
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
        </div>
    );
  }  
}