/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const options = [
            {name: '5', value: 5},
            {name: '10', value: 10},
            {name: '15', value: 15},   
            {name: '20', value: 20},
            {name: '25', value: 25}
        ];
        
export default class CountDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { dropdownOpen: false, dropDownValue: '20', count: 20 };
        this.changeValue = this.changeValue.bind(this);
        this.count = 20;
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
  
    changeValue(e) {
        const choice = e.currentTarget.textContent;
        const value = e.currentTarget.value;
        this.setState({dropDownValue: choice, count: value});
        this.count = value;
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


