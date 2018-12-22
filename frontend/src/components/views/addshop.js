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

class Shop extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {name: '', latitude: '', longitude: '', address: '', post_code: null, addr_num: null, phone: null, opening: null, closing: null, days: null};
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
        this.flag = true;
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    handleSubmit () {
       const name = document.getElementById('name').value;
       const postal = document.getElementById('postal').value;
       const address = document.getElementById('address').value;
       const number = document.getElementById('number').value;
       const temp = address + ' ' + number + ' ' + postal + ' Greece';
       
       
       this.setState(() => ({name: name})); 
       
    }
    
    render() {
        return(
            <form id="register" onSubmit={() => this.handleSubmit()}>
                <div></div>
                <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon>Home Page</button>
                <br/>
                <div className="form-group">
                    <label id="label-form" htmlFor="name">Όνομα Καταστήματος:</label>
                    <input id="name" name="name" className="form-control" type="text" required/>
                </div>
                <div>
                    <label> Τωρινή τοποθεσία </label>
                    <input type="checkbox" name="location" id="location" onChange={() => this.getMyLocation()}></input>
                </div>
                <div> Ή </div>
                <div className="form-group">
                    <label id="label-form" htmlFor="address">Διεύθυνση:</label>
                    <input id="address" name="address" className="form-control" pattern="[A-Za-z]+" type="text" disabled={this.flag} required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="number">Αριθμός:</label>
                    <input type="text" id="number" disabled={this.flag} required/>
                </div>
                
                <div className="form-group">
                <label id="label-form" htmlFor="postal">ΤΚ:</label>
                    <input id="postal" name="postal" className="form-control" pattern="[0-9]+" type="text" disabled={this.flag} required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="hours">Ωράριο:</label>
                    <span> Από </span>
                    <input type="time" name="opening" className="form-control" id="opening"></input>
                    <span> Έως </span>
                    <input type="time" name="closing" className="form-control" id="closing"></input>
                </div>
                
                <div className="form-group">
                    <label> Καθημερινές </label>
                    <input type="checkbox" name="days" value="workdays" onChange={() => this.toggleCheckbox("Καθημερινές")}></input>
                    <label> Σάββατο </label>
                    <input type="checkbox" name="days" value="saturday" onChange={() => this.toggleCheckbox("Σάββατο")}></input>
                    <label> Κυριακή </label>
                    <input type="checkbox" name="days" value="sunday" onChange={() => this.toggleCheckbox("Κυριακή")}></input>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="phone">Τηλέφωνο Καταστήματος:</label>
                    <input type="tel" id="phone" pattern="210\d{10}" name="phone"/>
                </div>
                
                <button className="btn" type="submit" id="button1">Προσθήκη</button>
            </form>
        );
  }
}

export default Shop;
