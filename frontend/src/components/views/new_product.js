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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';


class newProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {name: null, barcode: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    handleSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const barcode = document.getElementById('barcode').value;

        this.setState(() => ({ name: name, barcode: barcode}));   
       
        browserHistory.push('/search');
    }
  
    render() {
        return(
            <div>
            <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
            <form id="login" onSubmit={this.handleSubmit}>
                <div></div>
                
                <br/>
                <div className="form-group">
                    <label id="label-form" htmlFor="barcode">Barcode Προϊόντος: </label>
                    <input id="barcode" name="barcode" pattern="[0-9]{1,128}" className="form_input" type="text" required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="name">Όνομα Προϊόντος: </label>
                    <input type="text" name="name" className="form_input" id="name" required></input>
                </div>
                <input className="btn" type="submit" id="button1" value="Προσθήκη"></input>
           </form>
           <button className="btn" type="button" id="button2" onClick={browserHistory.goBack}>Ακύρωση</button>
           </div>
        );
  }
}

export default newProduct;

