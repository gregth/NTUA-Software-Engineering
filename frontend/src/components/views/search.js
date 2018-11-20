/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GeolocatedProps, geolocated } from 'react-geolocated';

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

class Search extends React.Component {
 
     constructor(props) {
        super(props);
        this.state = {search: '', latitude: '', longitude: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.defaultProps = {center: {lat: 59.95, lng: 30.33}, zoom: 11};
        this.getMyLocation = this.getMyLocation.bind(this);
    }
  
  componentDidMount() {
    this.getMyLocation();
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

                    <button id="search_btn" type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                </form>
                Location:
                <input type="text" value={this.state.latitude} />
        <input type="text" value={this.state.longitude} />
            
            </div>
        );
    }
}

export default Search;