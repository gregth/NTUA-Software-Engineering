/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import TooltipItem from './tooltip';
import React, { Component } from "react";
import { Table, Pagination, PaginationItem, PaginationLink, Tooltip } from 'reactstrap';
import {receive_from_server} from '../communication/receive';

class PapigationResults extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.createData = this.createData.bind(this);
        this.request = this.request.bind(this);
        this.state = {
            tooltipOpen: false, currentPage: 0, error: null, success: null, not_found: null, ready: null
        };
        this.dataSet = null;    
        this.pagesCount = null;
        this.pageSize = 3;
        this.sort = 'id|DESC';
        this.status = 'ACTIVE';
        this.start = 0;
        this.total = null;
        this.products = null;
        this.request();
    }
  
    createData () {
        this.dataSet = this.products.map(product => (
            <tr key={product.id} onClick={() => this.props.select(product.id)} className="row_pointer">
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>Από {product.min_price}€</td>
                <td>
                    <TooltipItem id={product.id} text={product.description}/>
                </td>
            </tr>
        ));  
    }
  
    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    
    async request () {
        const search = document.getElementById('search').value;
        const category = this.props.category;
        
        var body = {
            search,
            category
        };
        
        console.log(body);
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
        if (this.start !== result.start || this.pageSize !== result.count) {
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

    render() {
        const { currentPage } = this.state;
        return (
            <div>
            {!this.state.ready
            ?<div> Loading </div>
            :<React.Fragment>   
                <Table hover>
                    <thead>
                        <tr>
                            <th>Όνομα Προϊόντος</th>
                            <th>Κατηγορία</th>
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

export class PricesTable extends Component {
    constructor(props) {
        super(props);
        this.id = null;
        this.select = this.select.bind(this);
    }
    
    
    select (id) {
        this.id = id;
        console.log(this.id);
    }
    
    render() {
        const price = this.props.max_price;
        return ( 
            <PapigationResults category={this.props.category} select={this.select}/>
        );
    }
};

export default PricesTable;
    
