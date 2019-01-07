import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { SearchBar } from 'react-native-elements'
import { Slider } from 'react-native-elements'
//import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-boostrap';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { GeolocatedProps, geolocated } from 'react-geolocated';
//import { browserHistory } from 'react-router';
//import Slider from 'react-rangeslider';
//import Geocode from 'react-geocode';


class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    let data = [{
      value: 'Κρασί',
    }, {
      value: 'Μπύρες',
    }, {
      value: 'Βότκα',
    }, {
      value: 'Ουίσκι',
    },{
      value: 'Ρούμι',
    }, {
      value: 'Gin',
    },{
      value: 'Τεκίλα',
    },{
      value: 'Aναψυκτικά',
    },{
      value: 'Snacks',
    },{
      value: 'Χωρίς Αλκοόλ',
    }];

    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
       <Text>Alcowatch</Text>
      <Dropdown
        label='Επιλογή Κατηγορίας'
        data={data}
      />
      <SearchBar
      lightTheme
//  onChangeText={someMethod}
//  onClear={someMethod}
  placeholder='Αναζήτηση με όνομα...' />


  <Slider
  //  value={this.state.value}
  //  onValueChange={(value) => this.setState({value})}
    />
<Text> Μέγιστη Τιμή</Text>

      </View>
    );
  }
/*      <React.Fragment>
      <h1> Αναζήτηση Προϊόντων </h1>

                          <input id="search" type="text" placeholder="Search.." name="search"></input>
                          <button id="search_btn" type="submit">
                          <br/><br/>
                          <label> Μέγιστη τιμή </label>
                          <Range range={this.state.price} updateRange={this.updateRange}/>
                          <br/>
                          <label> Only nearby shops</label>
      </React.Fragment>
*/

}
export default HomeScreen;
