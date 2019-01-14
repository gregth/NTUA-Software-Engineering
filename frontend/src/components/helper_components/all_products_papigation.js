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

export default class PapigationResults extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.createData = this.createData.bind(this);
    this.state = {
        tooltipOpen: false, currentPage: 0
    };
    this.dataSet = null;    
    this.pagesCount = null;
    this.pageSize = 10;
  }
  
  createData () {
      this.dataSet = this.props.data.map(product => (
        <tr key={product.id} onClick={() => this.props.select(product.id)} className="row_pointer">
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>
                <TooltipItem id={product.id} text={product.description}/>
            </td>
            <td>Brand</td>
            <td>
                <button className="search_btn" id="edit_btn" onClick={() => this.props.edit(product.id)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                <button className="search_btn" id="delete_btn" onClick={() => this.props.delete(product.id, product.name)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>     
                <button className="search_btn" id="search_product_btn" onClick={() => this.props.search(product.id)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </td>
        </tr>
    ));
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);  
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
    this.createData();
    return (    
        <React.Fragment>   
            <Table hover>
                <thead>
                    <tr>
                        <th>Όνομα Προϊόντος</th>
                        <th>Κατηγορία</th>
                        <th>Περιγραφή</th>
                        <th>Μάρκα</th>
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