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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const options = [
            {name: 'Όλα', value: 'ALL'},
            {name: 'Αποσυρθέντα', value: 'WITHDRAWN'},
            {name: 'Ενεργά', value: 'ACTIVE'}        
        ];
        
export default class StatusDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { dropdownOpen: false, dropDownValue: 'Ενεργά', status: 'ACTIVE' };
        this.changeValue = this.changeValue.bind(this);
        this.status = 'ACTIVE';
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
  
    changeValue(e) {
        const choice = e.currentTarget.textContent;
        const value = e.currentTarget.value;
        this.setState({dropDownValue: choice, status: value});
        this.status = value;
        this.props.click();
    }

    render() {
        return ( 
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle className="btn-block" caret>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu className="btn-blk">
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

