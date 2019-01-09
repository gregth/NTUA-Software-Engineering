/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import TooltipItem from './tooltip';
import React, { Component } from "react";
import { Table, Pagination, PaginationItem, PaginationLink, Tooltip } from 'reactstrap';


class PapigationResults extends React.PureComponent {
  constructor(props) {
    
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
        tooltipOpen: false
    };
        
    this.dataSet = this.props.data.map(product => (
                
                    <tr key={product.id} onClick={() => this.props.select(product.id)} className="row_pointer">
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>price</td>
                        <td>
                            <TooltipItem id={product.id} text={product.description}/>
                        </td>
                    </tr>
                ));

    this.pageSize = 10;
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);

    this.state = {
        currentPage: 0
    };
    
  }
  toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    
  handleClick(e, index) {
    
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const { currentPage } = this.state;
    return (    
        <React.Fragment>   
            <Table hover>
                <thead>
                    <tr>
                        <th>Όνομα Προϊόντος</th>
                        <th>Κατηγορία</th>
                        <th>Τιμή</th>
                    </tr>
                </thead>
                {this.dataSet
                .slice(
                    currentPage * this.pageSize,
                    (currentPage + 1) * this.pageSize
                )
                .map((data, i) => 
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
    
    );
  
  }
  
}

export class ProductsTable extends Component {
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
        return ( 
            <PapigationResults data={this.props.products} select={this.select}/>
        );
    }
};

export default ProductsTable;
    
