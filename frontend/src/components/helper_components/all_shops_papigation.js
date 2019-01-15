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
import TooltipItem from './tooltip';
import { Table, Pagination, PaginationItem, PaginationLink, Tooltip, Button } from 'reactstrap';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';
import SortDropdown from '../helper_components/sort_products_shops';
import StatusDropdown from '../helper_components/status_products_shops';
import CountDropdown from '../helper_components/count_products_shops';

export default class PapigationShops extends React.PureComponent {
    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this);
        this.request = this.request.bind(this);
        this.sortChoose = this.sortChoose.bind(this);
        this.statusChoose = this.statusChoose.bind(this);
        this.countChoose = this.countChoose.bind(this);
        this.state = {
            tooltipOpen: false, currentPage: 0, error: null, success: null, not_found: null, ready: null
        };
        this.dataSet = null;    
        this.pagesCount = null;
        this.pageSize = 20;
        this.sort = 'id|DESC';
        this.status = 'ACTIVE';
        this.start = 0;
        this.total = null;
        this.shops = null;
        this.request();
    }
  
    createData () {
        this.dataSet = this.shops.map(shop => (
        <tr key={shop.id} onClick={() => this.props.select(shop.id)} className="row_pointer">
            <td>{shop.name}</td>
            <td>{shop.address}</td>
            <td>{shop.phone}</td>
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
                <button className="search_btn" id="search_shop_btn" onClick={() => this.props.search(shop.id)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </td>
        </tr>
        )); 
    }
    
    async request () {        
        const url = 'http://localhost:3002/shops?start=' + this.start + 
                    '&count=' +  this.pageSize + '&sort=' + this.sort +
                    '&status=' + this.status;
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
        var result = await answer.json().then((result) => {return result;});
        console.log(result);
        if (this.start !== result.start || parseInt(this.pageSize) !== result.count) {
            this.setState({not_found: true, success: false});
            return;
        }
        this.total = result.total;
        this.shops = result.shops;
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
        this.setState({ready: true});
    }
    
    async statusChoose () {
        this.setState({ready: false});
        this.status = this.refs.status.status;
        this._isMounted = await this.request();
        this.setState({ready: true});
    }
    
    async countChoose () {
        this.setState({ready: false});
        this.pageSize = this.refs.count.count;
        this._isMounted = await this.request();
        this.setState({ready: true});
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
                        </tr>
                    </tbody>
                </Table>
                {!this.state.ready
                ?<div> Loading </div>
                :<React.Fragment>   
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Όνομα Καταστήματος</th>
                                <th>Διεύθυνση</th>
                                <th>Τηλέφωνο</th>
                                <th>Χαρακτηριστικά</th>
                                <th>Κατάσταση</th>
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
            }
        </div>
    );
  }
}