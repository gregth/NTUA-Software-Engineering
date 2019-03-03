import React, { Component } from 'react';
import {DropdownMenu, DropdownToggle, Dropdown, DropdownItem  } from 'reactstrap';

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
            {name: 'Σνακς', value: 'snacks'},
            {name: 'Άλλο', value: 'all'}           
        ].sort(compare);


function compare(a, b){
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

export class Categories extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        if (this.props.default) {
            for (var i in options) {
                if (options[i].value === this.props.default) var name = options[i].name; 
            }
            this.state = { dropdownOpen: false, dropDownValue: name, category: this.props.default };
        }
        else {
            this.state = { dropdownOpen: false, dropDownValue: 'Όλες οι κατηγορίες', category: 'Όλες οι κατηγορίες' };
        }
        this.changeValue = this.changeValue.bind(this);
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
  
    changeValue(e) {
        const category = e.currentTarget.textContent;
        var value = null;
        for (var i in options) {
            if (options[i].name === category) value = options[i].value; 
        }
        this.setState({dropDownValue: category, category: value});
    }

    render() {
        return ( 
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.changeValue}>
                            Όλες οι κατηγορίες
                        </DropdownItem>
                        <DropdownItem divider />
                        {options.map(option => (
                            <DropdownItem onClick={this.changeValue} key={option.value}>
                                {option.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
};

export default Categories;