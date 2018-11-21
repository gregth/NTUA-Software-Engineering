/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import { browserHistory } from 'react-router';
import Slider from 'react-rangeslider';
import Geocode from 'react-geocode';

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);
  }
  
  updateRange(e) {
    this.props.updateRange(e.target.value);
  }
  
  render() {
    // console.log(this.props);
    const { range } = this.props;
    return (
      <div>
        <input id="range" type="range"
          value={range}
          min="0"
          max="50"
          step="0.01"
          onChange={this.updateRange}
        />
        <span id="price">{range}€</span>
      </div>
    );
  }
}

class Search extends React.Component {
 
     constructor(props) {
        super(props);
        this.state = {search: [], latitude: '', longitude: '', price: 50};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.defaultProps = {center: {lat: 59.95, lng: 30.33}, zoom: 11};
        this.getMyLocation = this.getMyLocation.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.homepage = this.homepage.bind(this);
        this.updateRange = this.updateRange.bind(this);
    }
    
    updateRange(val) {
        this.setState({
            price: val
        });
    } 
    
    componentWillMount() {
        this.selectedCheckboxes = new Set();
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    toggleCheckbox(label){
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } 
        else {
            this.selectedCheckboxes.add(label);
        }
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
        
        Geocode.fromLatLng("48.8583701", "2.2922926").then(
            response => {
                const address = response.results[0].formatted_address;
                console.log(address);
            },
            error => {
                alert(error);
            }
        );
    }
    
    handleSubmit () {
        const s = document.getElementById('search').value;
       
        if (s !== '') {
            this.selectedCheckboxes.add(s);
        }
        
        this.setState(() => ({search: this.selectedCheckboxes}));
    }
    
    render() {
        return (
            <div>
                <button id="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
                <br/>
                <h1> Αναζήτηση Προϊόντων </h1>
                
                <form id="searching" onSubmit={() => this.handleSubmit()}>
                    <label> Κρασί </label>
                    <input type="checkbox" name="product" value="wine" onChange={() => this.toggleCheckbox("Κρασί")}></input>
                    <label> Μακαρόνια </label>
                    <input type="checkbox" name="product" value="pasta" onChange={() => this.toggleCheckbox("Μακαρόνια")}></input>
                    <label> Χυμός </label>
                    <input type="checkbox" name="product" value="juice" onChange={() => this.toggleCheckbox("Χυμός")}></input>
                    <label> Φρούτα </label>
                    <input type="checkbox" name="product" value="fruits" onChange={() => this.toggleCheckbox("Φρούτα")}></input>
                    <br/>
                    <input id="search" type="text" placeholder="Search.." name="search"></input>
                    <button id="search_btn" type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    <br/><br/>
                    <label> Μέγιστη τιμή </label>
                    <Range range={this.state.price} updateRange={this.updateRange}/>
                    <br/>
                    <label> Only nearby shops</label>
                    <input type="checkbox" name="location" onChange={() => this.getMyLocation()}></input>
                </form>
            </div>
        );
    }
}

export default Search;