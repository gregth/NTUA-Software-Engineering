/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SortDistance extends React.Component {
    constructor(props) {
        super(props);
        this.options = [
            {name: 'Καμία επιλογή', value: null},
            {name: 'Απόσταση - Αύξουσα', value: 'dist|ASC'},
            {name: 'Απόσταση - Φθίνουσα', value: 'dist|DESC'}   
        ];

        this.toggle = this.toggle.bind(this);
        if (this.props.default) {
            var name = null;
            Object.entries(this.options).forEach(([key, value]) => {
                if (value.value === this.props.default) name = value.name;
            });
            this.state = { dropdownOpen: false, dropDownValue: name, sort: this.props.default };
        }
        else {
            this.state = { dropdownOpen: false, dropDownValue: 'Καμία επιλογή', sort: null };
        }
        
        this.changeValue = this.changeValue.bind(this);
        this.sort = null;
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
    }

    render() {
        return ( 
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu right>
                        {this.options.map(option => (
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

