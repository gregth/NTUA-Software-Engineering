/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Alert, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import React from "react";
import {receive_from_server} from '../communication/receive';
import CountDropdown from '../helper_components/count_products_shops';
import { getLocation } from '../functions/current_location';
import MapClass from '../helper_components/map_price';
import ProductInfo from '../helper_components/product_info';
import ShopInfo from '../helper_components/shop_info';

export default class PricesTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this);
        this.request = this.request.bind(this);
        this.countChoose = this.countChoose.bind(this);
        this.make_url = this.make_url.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {
            tooltipOpen: false, currentPage: 0, error: null, success: null, 
            not_found: null, ready: null, error_message: null, message: null
        };
        this._isMounted = null;
        this.dataSet = null;    
        this.pagesCount = null;
        this.pageSize = 20;
        this.sort = 'id|DESC';
        this.start = 0;
        this.total = null;
        this.prices = null;
        this.request();
    }
    
    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    createData () {
        this.dataSet = this.prices.map(price => (
            <tr key={price.id}>
                <td>{price.productName}</td>
                <td>{price.productTags.join(', ')}</td>
                <td>{price.shopName}</td>
                <td>{price.shopTags.join(', ')}</td>
                <td>{price.shopAddress}</td>
                <td>{price.date}</td>
                <td>{price.shopDist ? price.shopDist.toFixed(2) + 'km' : '-'}</td>
                <td>{price.price + '€'}</td>
                <td>
                    <ProductInfo id={price.productId}/>
                    <ShopInfo id={price.shopId}/>
                    <MapClass product_id={price.productId} shop_id={price.shopId} price={price.price}/>
                </td>
            </tr>
        ));
    } 
    
    async make_url () {
        var url = '/prices?start=' + this.start + 
                    '&count=' +  this.pageSize;
        var params = [];
        if (this.props.params) {
            var i;
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
            if (this.props.params.tags) {
                for (i=0; i<this.props.params.tags.length; i++) {
                    params.push('tags='+ this.props.params.tags[i]);
                }
            }
            if (this.props.params.geodist) {
                let result = await getLocation();
                params.push('geoDist='+ this.props.params.geodist);
                params.push('geoLng='+ result[1]);
                params.push('geoLat='+ result[0]);
            }
            if (this.props.params.price) {
                params.push('price='+ this.props.params.price);
            }
            if (this.props.params.category) {
                params.push('category='+ this.props.params.category);
            }
        }
        if (this.props.shops) {
            for (i=0; i<this.props.shops.length; i++) {
                params.push('shops='+ this.props.shops[i]);
            }
        }
        if (this.props.products) {
            for (i=0; i<this.props.products.length; i++) {
                params.push('products='+ this.props.products[i]);
            }
        }
        if (params.length > 0){
            var temp = params.join('&');
            return url + '&' + temp;
        }
        else{
            return url;
        }
    }
    async request () {
        try {
            this._isMounted = this.setState({success: null, error: null, not_found: null, message: null, error_message: null});
        }
        catch (e) {
            console.log(e);
        }
        var temp = await this.make_url().then(url => {return url;});
        console.log(temp)
        const url = temp;
        
        this._isMounted = await receive_from_server(url);
        const answer = this._isMounted;
        
        try {
            if (answer === 'error') {
                this._isMounted = this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this._isMounted = this.setState({success: true});
            }
            else if (answer.status === 404) {
                this._isMounted = this.setState({message: 'Error 404 - Not Found', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this._isMounted = this.setState({message: 'Error 401 - Not Authorized', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this._isMounted = this.setState({message: 'Error 403 - Forbidden', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this._isMounted = this.setState({message: 'Error 400 - Bad Request', not_found: true});
                return;
            }
            else {
                this._isMounted = this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                return;
            }
        }
        catch (error) {
            this._isMounted = this.setState({error: true, error_message: error});
            return;
        }
        
        var result = await answer.json().then((result) => {return result;});
        console.log(result);
        if (this.start !== result.start || parseInt(this.pageSize) !== result.count) {
            console.log(result.start, result.count, parseInt(this.pageSize), )
            this.setState({error: true, success: false});
            return;
        }
        this.total = result.total;
        this.prices = result.prices;
        console.log(this.prices);
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
    
    async refresh () {
        this.setState({ready: false});
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
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
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
                {!this.state.ready || !this.dataSet
                ?<div> Loading... </div>
                :<div>
                {this.dataSet.length > 0
                ?<React.Fragment>   
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
                : <div>Δε βρέθηκαν αποτελέσματα.</div>
                }
            </div>
            }
        </div>
    );
  }  
}
    
