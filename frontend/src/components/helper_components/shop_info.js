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
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import {receive_from_server} from '../communication/receive';

export default class ShopInfo extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.request_shop = this.request_shop.bind(this);
        this._asyncRequest = null;
        this.state = {
            popoverOpen: false, shop: null, error_message: null, message: null, not_found: false, success: null, error: null
        };
    }
    
    componentWilldUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    
    async request_shop() {
        this.setState({success: null, error: null, not_found: null, message: null, error_message: null });
        const url = 'http://localhost:3002/shops/' + this.props.id;
        this._asyncRequest = await receive_from_server(url);
        const answer = this._asyncRequest;
        
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Not Found', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Not Authorized', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Forbidden', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Bad Request', not_found: true});
                return;
            }
            else {
                this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.setState({shop: details});
        return details;
    }
    
    async toggle() {
        this._asyncRequest = await this.request_shop();
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <div>
                <button className="search_btn" id={"shop_btn" + this.props.id} title='Πληροφορίες καταστήματος'>
                    <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                </button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"shop_btn" + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>Πληροφορίες Καταστήματος</PopoverHeader>
                    {this.state.shop
                    ? <PopoverBody>
                        <strong>Όνομα: </strong>
                        {this.state.shop.name}<br/>
                        <strong>Διεύθυνση: </strong>
                        {this.state.shop.address}<br/>
                        <strong>Τηλέφωνο: </strong>
                        {this.state.shop.telephone}<br/>
                        <strong>Χαρακτηριστικά: </strong>
                        {this.state.shop.tags.join(', ')}
                        
                    </PopoverBody>
                    : <div>Loading...</div>
                }
                </Popover>
            </div>
        );
    }
}


