import React, { Component } from 'react';
import SelectSearch from 'react-select-search';

const options = [
    {name: 'Όλες οι κατηγορίες', value: 'all'},
    {
        type: 'group',
        items: [
            {name: 'Αναψυκτικά', value: 'beverages'},
            {name: 'Βότκα', value: 'vodka'},
            {name: 'Κονιάκ', value: 'koniak'},
            {name: 'Κρασί', value: 'wine'},
            {name: 'Λικέρ', value: 'liquer'},
            {name: 'Μπύρες', value: 'beer'},
            {name: 'Ούζο', value: 'ouzo'},
            {name: 'Ουίσκι', value: 'whiskey'},
            {name: 'Ρούμι', value: 'rum'},
            {name: 'Σνακς', value: 'snacks'},
            {name: 'Τζιν', value: 'gin'},
            {name: 'Τεκίλα', value: 'tequila'},
            {name: 'Τσίπουρο', value: 'tsipouro'},
            {name: 'Χωρίς Αλκοόλ', value: 'nonalchool'}
        ].sort(compare)
    }
];

function compare(a, b){
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

export class Categories extends Component {
  render() {
        return ( 
            <div>
                <SelectSearch options={options} value="all" name="categories" placeholder="Επιλογή Κατηγορίας" />
            </div>
        );
    }
};

export default Categories;
