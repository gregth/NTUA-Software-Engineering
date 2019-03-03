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
import { PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

export default class ShopInfo extends React.Component {
    render() {
        return (
            <div>
                <button className="search_btn" id={"shop_btn" + this.props.price.id} title='Πληροφορίες καταστήματος'>
                    <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                </button>
                <UncontrolledPopover trigger="focus" placement="bottom" target={"shop_btn" + this.props.price.id}>
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
                        {this.props.price.shopWithdrawn 
                        ? <p className='withdrawnShop'> Αποσυρθέν </p>
                        : <p className='activeShop'> Ενεργό </p>
                        }
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }
}


