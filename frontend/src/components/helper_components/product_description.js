/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export default class Description extends React.Component {
    render() {
        return (
            <div>
                <button className="search_btn" id={"description" + this.props.id} title='Περιγραφή προϊόντος'>
                    <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>
                </button>
                <UncontrolledPopover trigger="focus" placement="bottom" target={"description" + this.props.id}>
                    <PopoverHeader>Πληροφορίες Προϊόντος</PopoverHeader>
                    <PopoverBody>{this.props.text}</PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }
}

