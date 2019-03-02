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

import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

export default class ShopInfo extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }
    
    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <div>
                <button className="search_btn" id={"shop_btn" + this.props.price.shopId} title='Πληροφορίες καταστήματος'>
                    <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                </button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"shop_btn" + this.props.price.shopId} toggle={this.toggle}>
                    <PopoverHeader>Πληροφορίες Καταστήματος</PopoverHeader>
                    <PopoverBody>
                        <strong>Όνομα: </strong>
                        {this.props.price.shopName}<br/>
                        <strong>Διεύθυνση: </strong>
                        {this.props.price.shopAddress}<br/>
                        <strong>Τηλέφωνο: </strong>
                        {this.props.price.telephone}<br/>
                        <strong>Χαρακτηριστικά: </strong>
                        {this.props.price.shopTags.join(', ')}
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}


