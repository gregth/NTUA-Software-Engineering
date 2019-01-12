import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {DropdownMenu, DropdownToggle, ButtonDropdown, DropdownItem  } from 'reactstrap';

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
            {name: 'Σνακς', value: 'snacks'}           
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
            this.state = { dropdownOpen: false, dropDownValue: this.props.default, category: null };
        }
        else {
            this.state = { dropdownOpen: false, dropDownValue: 'Επιλογή κατηγορίας', category: null };
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
        this.setState({dropDownValue: category, category: category});
    }

    render() {
        return ( 
            <div>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
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
                </ButtonDropdown>
            </div>
        );
    }
};

export default Categories;
