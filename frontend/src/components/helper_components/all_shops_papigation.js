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

export default class PapigationShops extends React.PureComponent {
  constructor(props) {
    super(props);
    this.createData = this.createData.bind(this);
    this.state = { currentPage: 0};
    this.dataSet = null;    
    this.pagesCount = null;
    this.pageSize = 10;
  }
  
  createData () {
      this.dataSet = this.props.data.map(shop => (
        <tr key={shop.id} onClick={() => this.props.select(shop.id)} className="row_pointer">
            <td>{shop.name}</td>
            <td>{shop.address}</td>
            <td>{shop.tags}</td>
            <td>
                <button className="search_btn" id="edit_btn" onClick={() => this.props.edit(shop.id)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                <button className="search_btn" id="delete_btn" onClick={() => this.props.delete(shop.id, shop.name)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>     
                <button className="search_btn" id="search_shop_btn" onClick={() => this.props.search(shop.id)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </td>
        </tr>
    ));
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);  
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
                        <th>Όνομα Καταστήματος</th>
                        <th>Διεύθυνση</th>
                        <th>Χαρακτηριστικά</th>
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