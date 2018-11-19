/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends React.Component {
     constructor(props) {
        super(props);
        this.state = {search: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit () {
       const s = document.getElementById('search').value;
       
       this.setState(() => ({ search: s}));  
       alert(s);
    }
    
    render() {
      return (
        <div> 
            <h1> Boooo! </h1>
            
            <form id="searching" onSubmit={() => this.handleSubmit()}>
                <input id="search" type="text" placeholder="Search.." name="search"></input>
                
                <button type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </form>
            </div>
          );
    }
}

export default Search;