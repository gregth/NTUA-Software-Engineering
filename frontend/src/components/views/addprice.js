/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import Geocode from 'react-geocode';
import cookie from 'react-cookies';
import Modal from './modal_product';

function coords_to_address (lat, long) {
  return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
              JSON.stringify(lat) + ',' + JSON.stringify(long) +
              '&key=' + 'AIzaSyAsLsF3d7bdPcNMcSwPfb8aUfcadkjOMH0')
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.status === 'OK') {
            return responseJson.results[0].formatted_address;
        }
        else {
            return 'not found';
        }
    });
}

function getCurrentPositionPromise() {
  const location = window.navigator && window.navigator.geolocation;
  return new Promise(function(resolve, reject) {
    location.getCurrentPosition(resolve, reject);
  });
}

function getLocation() {
  return getCurrentPositionPromise()
    .then(async (position) => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        let address = await coords_to_address(lat, long);
        console.log(address);
        return [position.coords.latitude, position.coords.longitude, address];
    })
    .catch((error) => {
          console.log(error);
    });
}

class Product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {username: cookie.load('username'), barcode: '', latitude: '', longitude: '', address: '', post_code: null, addr_num: null, price:null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.logoff = this.logoff.bind(this);        
        this.delete = this.delete.bind(this);
        this.favourite_products = this.favourite_products.bind(this);
        this.flag = false;
        this.toggleModal = this.toggleModal.bind(this);
        this.new_product = this.new_product.bind(this);
    }
    
    async currentLocation ()  {
        this.flag = !this.flag;
        var checkBox = document.getElementById("location");
        if (!checkBox.checked) {
            var temp = this.state.show_current;
            this.setState({ show_current: !temp});
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: [{latitude: result[0], longitude: result[1]}], show_current: !temp});
    }
    
    delete () {
        //TODO 
        cookie.remove('username', { path: '/' });
        browserHistory.push('/');
    }
    
    favourite_products () {
        browserHistory.push('/products');
    }
    
    logoff () {
        cookie.remove('username', { path: '/' });
        browserHistory.push('/');
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.toggleModal();
        const barcode = document.getElementById('barcode').value;
        const postal = document.getElementById('postal').value;
        const address = document.getElementById('address').value;
        const number = document.getElementById('number').value;
        const price = document.getElementById('price').value;
        const temp = address + ' ' + number + ' ' + postal + ' Greece';

        this.setState(() => ({barcode: barcode, price: price})); 
    }
    
    toggleModal() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    
    new_product () {
        //TODO
        alert("TODO");
    }
    
    render() {
        return(
            <div>
                <Modal show={this.state.isOpen} 
                        onClose={this.toggleModal} 
                        home={this.homepage}
                        new={this.new_product}>
                        Το προϊόν με barcode {this.state.barcode} δε βρέθηκε.
                </Modal>
                <div className="dropdown">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars}></FontAwesomeIcon> {this.state.username}</button>
                    <div className="dropdown-content">
                        <div onClick={() => this.favourite_products()}>Αγαπημένα Προϊόντα</div>
                        <div href="#">Αγαπημένα Καταστήματα</div>
                        <div onClick={() => this.delete()}>Απενεργοποίηση Λογαριασμού</div>
                        <div onClick={() => this.logoff()}>Αποσύνδεση</div>
                    </div>
                </div>
                
                <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
                
                <form className="addform" id="addproduct" onSubmit={this.handleSubmit}>
                        <div>
                            <label id="label-form" htmlFor="name">Barcode Προϊόντος:</label>
                            <input id="barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                        </div>
                        <div>
                            <label> Τωρινή τοποθεσία </label>
                            <input type="checkbox" name="location" id="location" onChange={() => this.currentLocation()}></input>
                        </div>
                        <div> Ή </div>
                        <div>
                            <label id="label-form" htmlFor="address">Όνομα Καταστήματος:</label>
                            <input id="name" name="name" type="text" disabled={this.flag}/>
                        </div>
                        
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
