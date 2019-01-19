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
import { faMapMarkedAlt, faWineBottle, faBuilding } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';
import SortDropdown from '../helper_components/sort_products_shops';
import StatusDropdown from '../helper_components/status_products_shops';
import CountDropdown from '../helper_components/count_products_shops';

export default class PricesTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this);
        this.request = this.request.bind(this);
        this.countChoose = this.countChoose.bind(this);
        this.shop_info = this.shop_info.bind(this);
        this.product_info = this.product_info.bind(this);
        this.show_map = this.show_map.bind(this);
        this.make_url = this.make_url.bind(this);
        this.state = {
            tooltipOpen: false, currentPage: 0, error: null, success: null, not_found: null, ready: null
        };
        this.dataSet = null;    
        this.pagesCount = null;
        this.pageSize = 20;
        this.sort = 'id|DESC';
        this.start = 0;
        this.total = null;
        this.products = null;
        this.request();
    }
  
    createData () {
        this.dataSet = this.products.map(price => (
            <tr key={price.id}>
                <td>{price.productName}</td>
                <td>{price.productTags}</td>
                <td>{price.shopName}</td>
                <td>{price.shopTags}</td>
                <td>{price.shopAddress}</td>
                <td>{price.date}</td>
                <td>{price.shopDist}</td>
                <td>{price.price}</td>
                <td>
                    <button className="search_btn" id="product_btn" title='Πληροφορίες προϊόντος' onClick={() => this.product_info(price.productId)}>
                        <FontAwesomeIcon icon={faWineBottle}></FontAwesomeIcon>
                    </button>
                    <button className="search_btn" id="shop_btn" title='Πληροφορίες καταστήματος' onClick={() => this.shop_info(price.shopId)}>
                        <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                    </button>
                    <button className="search_btn" id="map_btn" title='Εμφάνιση στον χάρτη' onClick={() => this.show_map(price.productId, price.shopId, price.price)}>
                        <FontAwesomeIcon icon={faMapMarkedAlt}></FontAwesomeIcon>
                    </button>
                </td>
            </tr>
        ));
    } 
    
    shop_info (id) {
        //TODO
    }
    
    product_info (id) {
        //TODO
    }
    
    show_map (product_id, shop_id, price){
        //TODO
    }
    
    make_url () {
        var url = 'http://localhost:3002/prices?';
        var params = [];
        if (this.props.params.datefrom) {
            params.push('dateFrom='+ this.props.params.datefrom);
        }
        if (this.props.params.dateto) {
            params.push('dateTo='+ this.props.params.dateto);
        }
        if (this.props.params.sort_distance) {
            params.push('sort='+ this.props.params.sort_distance);
        }
        if (this.props.params.sort_price) {
            params.push('sort='+ this.props.params.sort_price);
        }
        if (this.props.params.sort_date) {
            params.push('sort='+ this.props.params.sort_date);
        }
        if (this.props.params.sort_distance) {
            for (var i; i<this.props.params.tags; i++) {
                params.push('tags='+ this.props.params.tags[i]);
            }
        }
        var temp = params.join('&');
        return url + temp;
    }
    async request () {
        console.log(this.make_url());
        const url = 'http://localhost:3002/products?start=' + this.start + 
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
                            <th>Προϊόντα ανά σελίδα:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                                <th>Όνομα Προϊόντος</th>
                                <th>Χαρακτηριστικά Προϊόντος</th>
                                <th>Όνομα Καταστήματος</th>
                                <th>Χαρακτηριστικά Καταστήματος</th>
                                <th>Διεύθυνση Καταστήματος</th>
                                <th>Ημερομηνία Παρατήρησης</th>
                                <th>Απόσταση</th>
                                <th>Τιμή</th>
                                
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
    
