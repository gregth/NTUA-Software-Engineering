import { browserHistory } from 'react-router';
import { Alert, Input, Table, Pagination, PaginationItem, PaginationLink, Tooltip, Button } from 'reactstrap';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';
import SortDropdown from '../helper_components/sort_products_shops';
import StatusDropdown from '../helper_components/status_products_shops';
import CountDropdown from '../helper_components/count_products_shops';
import MapClass from '../helper_components/map';

export default class PapigationShops extends React.PureComponent {
    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this);
        this.request = this.request.bind(this);
        this.sortChoose = this.sortChoose.bind(this);
        this.statusChoose = this.statusChoose.bind(this);
        this.countChoose = this.countChoose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.search_shop = this.search_shop.bind(this);
        this._asyncRequest = null;
        this._isMounted = null;
        this.state = {
            error_message: null, tooltipOpen: false, currentPage: 0, error: null, success: null, not_found: null, ready: null, selected_shops: [], noshops: false, message: null
        };
        this.dataSet = null;    
        this.pagesCount = null;
        this.pageSize = 20;
        this.sort = 'id|DESC';
        this.status = 'ACTIVE';
        this.start = 0;
        this.total = null;
        this.shops = null;
        this.selected_shops = [];
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
    
    createData () {
        this.dataSet = this.shops.map(shop => (
        <tr key={shop.id} className="row_pointer">
            <td>{shop.name}</td>
            <td>{shop.address}</td>
            <td>{shop.telephone}</td>
            <td>{shop.tags.join(', ')}</td>
            <td>
                {!shop.withdrawn
                ? <div>Ενεργό</div>
                : <div>Αποσυρθέν</div>
                }
            </td>
            <td>
                <button className="search_btn" id="edit_btn" onClick={() => this.props.edit(shop.id)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                <button className="search_btn" id="delete_btn" onClick={() => this.props.delete(shop.id, shop.name)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>     
                <button className="search_btn" id="search_shop_btn" onClick={() => this.search_shop(shop.id)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </td>
            <td><Input type="checkbox" id={'shop'+shop.id} onChange={() => this.handleChange(shop.id)}></Input></td>
        </tr>
        )); 
    }
    
    search_shop (id) {
        browserHistory.push({
            pathname: '/results',
            search: '?shops=' + id.toString()
        });
    }
    
    search () {
        this.setState({error: null, not_found: null, message: null});
        if (this.selected_shops.length === 0) {
            this.setState({noshops: true});
            return;
        }
        browserHistory.push({
            pathname: '/results',
            search: '?shops=' + this.selected_shops.join('&shops=')
        });
    }
    
    handleChange(id) {
        if (this.selected_shops.includes(id)) {
            var index = this.selected_shops.indexOf(id);
            if (index > -1) {
                this.selected_shops.splice(index, 1);
            }
        }
        else {
            this.setState({noshops: false});
            this.selected_shops.push(id);
        }
        this.setState({selected_shops: this.selected_shops});
        this.setState({ready: true});
    }
    
    async request () {       
        this.setState({error: null, not_found: null, message: null});
        this.selected_shops = [];
        const url = 'http://localhost:3002/shops?start=' + this.start + 
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
                this.setState({message: 'Error 404 - Το αίτημα δεν ήταν επιτυχές', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Μη επιτρεπόμενη ενέργεια', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Απαιτείται σύνδεση', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Μη έγκυρες παράμετροι αιτήματος.', not_found: true});
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
        
        this._asyncRequest = await answer.json().then((result) => {return result;});
        var result = this._asyncRequest;
        console.log(result);
        
        if (this.start !== result.start || parseInt(this.pageSize) !== result.count) {
            this.setState({error: true, success: false});
            return;
        }
        
        this.total = result.total;
        this.shops = result.shops;
        this.pagesCount = Math.ceil(this.total / this.pageSize);
        this.createData();
        this.setState({ready: true});
    }
    
    async handleClick (e, index) {
        this.setState({ready: false});
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
            <Alert color="danger" isOpen={this.state.noshops===true}>Δεν έχει επιλεχθεί κανένα κατάστημα.</Alert>
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
            <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
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
                        <td><Button onClick={this.search}> Αναζήτηση τιμών επιλεγμένων καταστημάτων </Button></td>
                    </tr>
                </tbody>
            </Table>
            {!this.state.ready
            ?<div> Loading... </div>
            : <div>
                {this.dataSet.length >0
                ?<React.Fragment> 
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Όνομα Καταστήματος</th>
                                <th>Διεύθυνση</th>
                                <th>Τηλέφωνο</th>
                                <th>Χαρακτηριστικά</th>
                                <th>Κατάσταση</th>
                                <th/>
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
                    <MapClass shops={this.shops}/>
                </React.Fragment>
                : <div> Δε βρέθηκαν αποτελέσματα. </div>
                }
            </div>
            }
        </div>
    );
  }
}