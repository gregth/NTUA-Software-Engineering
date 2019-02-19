/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export default class Description extends React.Component {
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
                <button className="search_btn" id={"description" + this.props.id} title='Περιγραφή προϊόντος'>
                    <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>
                </button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"description" + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>Πληροφορίες Προϊόντος</PopoverHeader>
                    <PopoverBody>{this.props.text}</PopoverBody>
                </Popover>
            </div>
        );
    }
}

