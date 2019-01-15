/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const options = [
            {name: 'Όνομα - Αύξουσα', value: 'name|ASC'},
            {name: 'Όνομα - Φθίνουσα', value: 'name|DESC'},
            {name: 'id - Αύξουσα', value: 'id|ASC'},
            {name: 'id - Φθίνουσα', value: 'id|DESC'}         
        ];
        
export default class SortDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { dropdownOpen: false, dropDownValue: 'id - Φθίνουσα', sort: 'id|DESC' };
        this.changeValue = this.changeValue.bind(this);
        this.sort = 'id|DESC';
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
  
    changeValue(e) {
        const choice = e.currentTarget.textContent;
        const value = e.currentTarget.value;
        this.setState({dropDownValue: choice, sort: value});
        this.sort = value;
        this.props.click();
    }

    render() {
        return ( 
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu right>
                        {options.map(option => (
                            <DropdownItem onClick={this.changeValue} value={option.value} key={option.value}>
                                {option.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}
