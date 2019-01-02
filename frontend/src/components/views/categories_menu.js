/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import SelectSearch from 'react-select-search';

const options = [
    {name: 'Όλες οι κατηγορίες', value: 'all'},
    {name: 'Κρασί', value: 'wine'},
    {name: 'Μπύρες', value: 'beer'},
    {name: 'Βότκα', value: 'vodka'},
    {name: 'Ρούμι', value: 'rum'},
    {name: 'Gin', value: 'gin'},
    {name: 'Ουίσκι', value: 'whiskey'},
    {name: 'Τεκίλα', value: 'tequila'},
    {name: 'Αναψυκτικά', value: 'beverages'},
    {name: 'Snacks', value: 'snacks'},
    {name: 'Χωρίς Αλκοόλ', value: 'nonalchool'}
];

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
