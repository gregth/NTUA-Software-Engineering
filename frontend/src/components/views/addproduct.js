/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';

class Product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {barcode: '', latitude: '', longitude: '', address: '', post_code: null, addr_num: null, price:null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.getMyLocation = this.getMyLocation.bind(this);
        this.flag = false;
    }
    
    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
            });
        }
        this.flag = !this.flag;
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    handleSubmit () {
       const barcode = document.getElementById('barcode').value;
       const postal = document.getElementById('postal').value;
       const address = document.getElementById('address').value;
       const number = document.getElementById('number').value;
       const price = document.getElementById('price').value;
       const temp = address + ' ' + number + ' ' + postal + ' Greece';
       
       
       this.setState(() => ({barcode: barcode, price: price})); 
       
    }
    
    render() {
        return(
            <div>
                <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon>Home Page</button>
                
                <form className="addform" id="addproduct" onSubmit={() => this.handleSubmit()}>
                        <div>
                            <label id="label-form" htmlFor="name">Barcode:</label>
                            <input id="barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                        </div>
                        <div>
                            <label> Τωρινή τοποθεσία </label>
                            <input type="checkbox" name="location" id="location" onChange={() => this.getMyLocation()}></input>
                        </div>
                        <div> Ή </div>
                        <div>
                            <label id="label-form" htmlFor="address">Διεύθυνση:</label>
                            <input id="address" name="address" pattern="[A-Za-z]+" type="text" disabled={this.flag} required/>
                        </div>

                        <div>
                            <label id="label-form" htmlFor="number">Αριθμός:</label>
                            <input type="text" id="number" disabled={this.flag} required/>
                        </div>

                        <div>
                            <label id="label-form" htmlFor="postal">ΤΚ:</label>
                            <input id="postal" name="postal" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                        </div>

                        <div>
                            <label id="label-form" htmlFor="price">Τιμή:</label>
                            <input type="text" id="price" pattern="[0-9,]+" name="price" required/>
                        </div>

                        <button className="btn" type="submit" id="button1">Προσθήκη</button>
                </form>
            </div>
        );
  }
}

export default Product;
