/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import TooltipItem from './tooltip';
import React, { Component } from "react";
import { Table } from 'reactstrap';


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
            <div>
                <Table hover>
                    <thead>
                      <tr>
                        <th>Όνομα Προϊόντος</th>

                        <th>Κατηγορία</th>
                        <th>Περιγραφή</th>
                        <th>Τιμή</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product => (
                        <tr key={product.id} onClick={() => this.select(product.id)} className="row_pointer">
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            {product.description.length > 40 
                            ? 
                            <td>
                                <TooltipItem key={product.id} text={product.description} text_span={product.description.substring(0,20) + '...'} id={product.id}/>
                            </td>
                            : <td>{product.description}</td>
                            }
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
};

export default ProductsTable;
    
