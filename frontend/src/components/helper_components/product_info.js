/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';

const options = [
            {name: 'Αναψυκτικά', value: 'beverages'},
            {name: 'Χωρίς Αλκοόλ', value: 'nonalchool'},
            {name: 'Βότκα', value: 'vodka'},
            {name: 'Κονιάκ', value: 'koniak'},
            {name: 'Τζιν', value: 'gin'},
            {name: 'Κρασί', value: 'wine'},
            {name: 'Λικέρ', value: 'liquer'},
            {name: 'Μπύρες', value: 'beer'},
            {name: 'Ούζο', value: 'ouzo'},
            {name: 'Ουίσκι', value: 'whiskey'},
            {name: 'Ρούμι', value: 'rum'},
            {name: 'Τεκίλα', value: 'tequila'},
            {name: 'Τσίπουρο', value: 'tsipouro'},
            {name: 'Σνακς', value: 'snacks'}           
        ];
        
export default class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.request_product = this.request_product.bind(this);
        this._asyncRequest = null;
        this.state = {
            popoverOpen: false, product: null, category: null
        };
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    
    async request_product() {
        const url = 'http://localhost:3002/products/' + this.props.id;
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
        
        var details = await answer.json().then((result) => {return result;});
        
        var name = null;
        for (var i in options) {
            if (options[i].value === details.category) var name = options[i].name; 
        }
        this.setState({product: details, category: name});
        return details;
    }
    
    async toggle() {
        this._asyncRequest = await this.request_product();
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <div>
                <button className="search_btn" id={"product_btn" + this.props.id} title='Πληροφορίες προϊόντος'>
                    <FontAwesomeIcon icon={faWineBottle}></FontAwesomeIcon>
                </button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"product_btn" + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>Πληροφορίες Προϊόντος</PopoverHeader>
                    {this.state.product
                    ? <PopoverBody>
                        <strong>Barcode: </strong>
                        {this.state.product.extraData.barcode}<br/>
                        <strong>Όνομα: </strong>
                        {this.state.product.name}<br/>
                        <strong>Μάρκα: </strong>
                        {this.state.product.extraData.brand}<br/>
                        <strong>Όγκος: </strong>
                        {this.state.product.extraData.volume}<br/>
                        <strong>Κατηγορία: </strong>
                        {this.state.category}<br/>
                        <strong>Χαρακτηριστικά: </strong>
                        {this.state.product.tags.join(', ')}<br/>
                        <strong>Περιγραφή: </strong>
                        {this.state.product.description}<br/>
                        
                    </PopoverBody>
                    : <div>Loading...</div>
                }
                </Popover>
            </div>
        );
    }
}

