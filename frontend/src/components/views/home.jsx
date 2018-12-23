import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import { browserHistory } from 'react-router';
import Slider from 'react-rangeslider';
import Geocode from 'react-geocode';
import Range from './range';

export default class Home extends Component {
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
    
    componentDidMount() {
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
    
    Login() {
        browserHistory.push('/login');
    }
   
    Register() {
        browserHistory.push('/register');
    }
    
    Map() {
        browserHistory.push('/map');
    }
    
    render() {
      return (
        <div> 
            <button className="btn" type="submit" id="button1" onClick={() => this.Login()}>Σύνδεση</button>
            <button className="btn" type="submit" id="button2" onClick={() => this.Register()}>Εγγραφή</button>
            <div className="search">
                <h1> Αναζήτηση Προϊόντων </h1>
                <form id="searching" onSubmit={() => this.handleSubmit()}>
                    <label> Κρασί </label>
                    <input type="checkbox" name="product" value="wine" onChange={() => this.toggleCheckbox("Κρασί")}></input>
                    <label> Μπύρες </label>
                    <input type="checkbox" name="product" value="beer" onChange={() => this.toggleCheckbox("Μπύρες")}></input>
                    <label> Βότκα </label>
                    <input type="checkbox" name="product" value="vodka" onChange={() => this.toggleCheckbox("Βότκα")}></input>
                    <label> Ουίσκι </label>
                    <input type="checkbox" name="product" value="whiskey" onChange={() => this.toggleCheckbox("Ουίσκι")}></input>
                    <label> Ρούμι </label>
                    <input type="checkbox" name="product" value="Rum" onChange={() => this.toggleCheckbox("Ρούμι")}></input>
                    <br/><br/>
                    <label> Gin </label>
                    <input type="checkbox" name="product" value="Gin" onChange={() => this.toggleCheckbox("Gin")}></input>
                    <label> Τεκίλα </label>
                    <input type="checkbox" name="product" value="Tequila" onChange={() => this.toggleCheckbox("Τεκίλα")}></input>
                    <label> Αναψυκτικά </label>
                    <input type="checkbox" name="product" value="beverages" onChange={() => this.toggleCheckbox("Αναψυκτικά")}></input>
                    <label> Snacks </label>
                    <input type="checkbox" name="product" value="snancks" onChange={() => this.toggleCheckbox("Snacks")}></input>
                    <label> Χωρίς Αλκοόλ </label>
                    <input type="checkbox" name="product" value="nonalchool" onChange={() => this.toggleCheckbox("Χωρίς Αλκοόλ")}></input>
                    <br/>
                    <input id="search" type="text" placeholder="Search.." name="search"></input>
                    <button className="search_btn" id="search_btn" type="submit"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    <br/><br/>
                    <label> Μέγιστη τιμή </label>
                    <Range range={this.state.price} updateRange={this.updateRange}/>
                    <br/>
                    <label> Only nearby shops</label>
                    <input type="checkbox" name="location" onChange={() => this.getMyLocation()}></input>
                </form>
            </div>
        </div>

          );
    }
}